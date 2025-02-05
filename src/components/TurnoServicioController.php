<?php

namespace App\Http\Controllers;

use App\Modelo;
use App\Servicio;
use App\Sucursal;
use App\Notification;
use App\TurnoServicio;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Mail\TurnoServicioReceived;
use Illuminate\Support\Facades\Mail;
use App\Events\SeHaSolicitadoUnTurno;
use App\Notifications\PushNotification;
use App\Http\Requests\ReCaptchataTestFormRequest;

class TurnoServicioController extends Controller
{
    
    use ApiResponser;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $solicitudes = TurnoServicio::cliente($request->cliente)
                    ->from($request->from)
                    ->email($request->email)
                    ->telefono($request->telefono)
                    ->orderBy('created_at', 'DESC')
                    ->paginate(20);

        
        return view('backend.solicitudes-turno.index', compact('solicitudes'));
    }

    public function panelPrincipal(Request $request)
    {

        $total = TurnoServicio::all()->count();

        $atendidas = TurnoServicio::where('atendido', 1)->count();

        $pendientes = TurnoServicio::where('atendido', 0)->count();

        $solicitudes = TurnoServicio::whereDate('created_at', Carbon::today())->paginate(20);

        return view('backend.solicitudes-turno.panel-ppal', compact('solicitudes', 'total', 'atendidas', 'pendientes'));
    }
    


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $rules = ['from' => 'required|in:web-site,app'];
        $this->validate($request, $rules);
        
        if ($request->from == 'app') {
            $rules = [
                'cliente' => 'required|string', 
                'telefono' =>'required|int', 
                'email' => 'required|email', 
                'modelo' => 'required|string',
                'dominio' => 'required|string',
                'servicio' => 'required|string',
                'fecha' => 'required|string',
                'sucursal' => 'in:Sáenz Peña,Resistencia,Charata',
                'from' => 'in:web-site,app',
            ];
            $this->validate($request, $rules);
            
            //Get User by Token
            $token = JWTAuth::parseToken();
            $user = JWTAuth::toUser($token);
            $user_id = $user->id;
        }
        
        if ($request->from == 'web-site') {
            $rules = [
                'cliente' => 'required|string', 
                'telefono' =>'required|int', 
                'email' => 'required|email', 
                'modelo' => 'required|string',
                'dominio' => 'required|string',
                'servicio' => 'required|string',
                'fecha' => 'required|string',
                // 'g-recaptcha-response' => 'required|captcha',
                'sucursal' => 'in:Sáenz Peña,Resistencia,Charata|required',
                'from' => 'in:web-site,app',
            ];
            $this->validate($request, $rules);

            $user_id = null;
        }
        
        $turno = TurnoServicio::create($request->all());
        $turno->user_id = $user_id;
        $turno->update();

        $this->sendTurnoByEmail($turno);

        return $this->showOne($turno, 200);

    }


    public function update(Request $request, TurnoServicio $solicitud)
    {
        $rules = [
            'atendido' => 'required|boolean',
            'fecha' => 'required|string',
            'hora' => 'required|string', 
        ];
        
        $this->validate($request, $rules);
        
        $solicitud->atendido = $request->atendido;
        $solicitud->fecha = $request->fecha;
        $solicitud->hora = $request->hora;
        $solicitud->update();
        
        if($solicitud->atendido && $solicitud->user_id){
            
            //Create Notification
            $title = 'Confirmación de Turno';
            $body = 'Su turno ha sido confirmado para el ' 
                    . date('d-m-Y', strtotime($solicitud->fecha)) . ' a las ' 
                    . date('h:i A', strtotime($solicitud->hora));
                    
            $notification = Notification::create([
                'title' => $title,
                'body' => $body,
                'user_id' => $solicitud->user_id,
            ]);
            
            //Send Push Notification
            $pushData = new \stdClass();
            $pushData->body = $notification->body;
            $pushData->title = $notification->title;
            $pushData->icon = '/notification-icon.png';
            $pushData->data = ['openUrl' => '/home/notifications'];

            \Notification::send($solicitud->user()->get(), new PushNotification($pushData));
        }

        return back()->with('success', 'Solicitud actualizada.');

    }


    public function show(TurnoServicio $solicitud)
    {
        return view('backend.solicitudes-turno.show', compact('solicitud'));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    private function sendTurnoByEmail($turno)
    {
        switch ($turno->sucursal) {
            case 'Sáenz Peña':
                Mail::to(env('RECEPTOR_DE_TURNOS_SP'))
                    ->cc(env('RECEPTOR_DE_TURNOS_AGUDO'))
                    ->send(new TurnoServicioReceived($turno));
                break;
            case 'Resistencia':
                Mail::to(env('RECEPTOR_DE_TURNOS_RESISTENCIA'))
                    ->cc([env('RECEPTOR_DE_TURNOS_RESISTENCIA_CC1'), env('RECEPTOR_DE_TURNOS_RESISTENCIA_CC2'), env('RECEPTOR_DE_TURNOS_AGUDO')])
                    ->send(new TurnoServicioReceived($turno));
                break;
            case 'Charata':
                Mail::to(env('RECEPTOR_DE_TURNOS_CHARATA'))
                    ->cc(env('RECEPTOR_DE_TURNOS_AGUDO'))
                    ->send(new TurnoServicioReceived($turno));
                break;
        }

        return;
    }
    
}
