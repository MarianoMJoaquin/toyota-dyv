<?php

namespace App\Http\Controllers;

use App\Sucursal;
use App\SolicitudTestDrive;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use App\Mail\TestDriveReceived;
use Illuminate\Support\Facades\Mail;
use App\Events\SeHaSolicitadoTestDrive;

class SolicitudTestDriveController extends Controller
{

    use ApiResponser;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $solicitudes = SolicitudTestDrive::orderBy('id', 'DESC')->paginate(10);
        
        return view('backend.test-drive.index', compact('solicitudes'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //return $request;
        $rules = [
            'cliente' => 'required',
            'telefono' => 'required',
            'email' => 'required',
            'fecha_estimada' => 'required',
            'modelo' => 'required',
            'g-recaptcha-response' => 'required|captcha',
            'sucursal' => 'in:Sáenz Peña,Resistencia,Charata,Villa Ángela',
            'from' => 'in:app,web-site',
        ];

        $this->validate($request, $rules);

        $test_drive = SolicitudTestDrive::create($request->all());

        switch ($request->sucursal) {
            case 'Sáenz Peña':
                $email = env('RECEPTOR_EMAILS_TESTDRIVE'); //SAENZ PEÑA
                Mail::to($email)->send(new TestDriveReceived($test_drive));
                break;
            case 'Resistencia':
                $email = env('RECEPTOR_EMAILS_TESTDRIVE'); //RESISTENCIA
                Mail::to($email)->send(new TestDriveReceived($test_drive));
                break;
            case 'Charata':
                $email = env('RECEPTOR_EMAILS_TESTDRIVE'); //CHARATA
                Mail::to($email)->send(new TestDriveReceived($test_drive));
                break;
            case 'Villa Ángela':
                $email = env('RECEPTOR_EMAILS_TESTDRIVE'); //VILLA ANGELA
                Mail::to($email)->send(new TestDriveReceived($test_drive));
                break;
        }

        $test_drive->enviar_a = $email;
        $test_drive->save();

        return $this->showOne($test_drive);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SolicitudTestDrive  $solicitudTestDrive
     * @return \Illuminate\Http\Response
     */
    public function show(SolicitudTestDrive $solicitudTestDrive)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SolicitudTestDrive  $solicitudTestDrive
     * @return \Illuminate\Http\Response
     */
    public function destroy(SolicitudTestDrive $solicitudTestDrive)
    {
        //
    }
}
