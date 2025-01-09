<?php

namespace App\Http\Controllers;

use App\Message;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use App\Mail\MessageReceived;
use App\Mail\AutomaticResponser;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{

    use ApiResponser;

    protected $refer = 'contacto, financiacion, tpa, la_voz_del_cliente, usados';
    private $froms=['contacto', 'financiacion', 'tpa', 'la_voz_del_cliente', 'usados'];


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $froms = $this->froms;
        $filterFroms = collect($request->filterFroms);
        $cliente = $request->cliente;
        $desde = $request->desde;
        $hasta = $request->hasta;

        $messages = Message::cliente($request->cliente)
                    ->filterFroms($request->filterFroms)
                    ->desde($request->desde)
                    ->hasta($request->hasta)
                    ->orderBy('created_at', 'DESC')
                    ->paginate(15);

        return view('backend.contacto.index', compact('messages', 'froms', 'filterFroms', 'cliente', 'desde', 'hasta'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

         $rules = [
            'name' => 'required|min:3|max:30',
            'phone' => 'required',
            'email' => 'required',
            'message' => 'required',
            //'g-recaptcha-response' => 'required|captcha',
            'sucursal' => 'in:Sáenz Peña,Resistencia,Charata,Villa Ángela',
            'from' => 'required|in:contacto,financiacion,tpa,la_voz_del_cliente,usados',
        ];

        $this->validate($request, $rules);

        $message = Message::create($request->all());

        if ($request->from == 'contacto' ){
            $message->interest = 'CONVENCIONAL';
            Mail::to('fabianaaranda@derkayvargas.com.ar')
                ->cc(['soledadbattaglia@derkayvargas.com.ar'])
                ->send(new MessageReceived($message));
        }

        if ($request->from == 'usados' ){
            $message->interest = 'USADO';
            Mail::to('fabianaaranda@derkayvargas.com.ar')
                ->cc(['soledadbattaglia@derkayvargas.com.ar'])
                ->send(new MessageReceived($message));
        }

        if ($request->from == 'financiacion' ){
            $message->interest = 'CONVENCIONAL';
            Mail::to('fabianaaranda@derkayvargas.com.ar')
                ->cc(['soledadbattaglia@derkayvargas.com.ar'])
                ->send(new MessageReceived($message));
        }

        if ($request->from == 'la_voz_del_cliente' ){
            $message->interest = 'CONVENCIONAL';
            Mail::to('matiasromero@derkayvargas.com.ar')
                ->cc(['fabianaaranda@derkayvargas.com.ar', 'soledadbattaglia@derkayvargas.com.ar'])
                ->send(new MessageReceived($message));
        }

        if ($request->from == 'tpa' ){
            $message->interest = 'PLAN';
            $message->message .= ' - Localidad: ' . $request->localidad;
            Mail::to('santiagogaliano@derkayvargas.com.ar')
                ->send(new MessageReceived($message));
        }


        $this->sendLeadToSalesforce($message);

        $this->sendAutomaticResponseToClient($message);

        return $this->showOne($message);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        return view('backend.contacto.show', compact('message'));
    }



    private function sendLeadToSalesforce($message)
    {

        $dataRaw = '{
                "prospect":{
                    "requestdate":"%createdAt%",
                    "customer":{
                        "comments":"%message%",
                        "interest":"%interest%",
                        "contacts":[{
                            "emails":[
                                {
                                    "value":"%email%"
                                }
                            ],
                            "names":[
                                {
                                    "part":"first",
                                    "value":"%firstName%"
                                },
                                {
                                    "part":"last",
                                    "value":"%lastName%"
                                }
                            ],
                            "phones":[
                                {
                                    "type":"phone",
                                    "value":"%phone%"
                                },
                                {
                                    "type":"mobile",
                                    "value":"%phone%"
                                }
                            ],
                            "addresses":[
                                {
                                "city":"Chaco",
                                "country":"Argentina"
                                }
                            ]
                        }]
                    },
                    "vehicles":[
                        {
                            "make":"",
                            "model":"",
                            "code": ""
                        }
                    ],
                    "provider":{
                        "name":{
                            "value":"Página Web",
                            "origin":"Pagina web"
                        }
                    },
                    "boca de venta": "RESI"
                }
            }';

        $message->message = $message->message . '. Sucursal: ' . $message->sucursal;
        $arrNames = explode(" ", $message->name);

        if(sizeof($arrNames) > 1){
            $message->firstName = explode(" ", $message->name)[0];
            $message->lastName = explode(" ", $message->name)[1];
        }else{
            $message->firstName = explode(" ", $message->name)[0];
            $message->lastName = explode(" ", $message->name)[0];
        }

        $dataRaw = str_replace("%createdAt%", date('d/m/Y H:i', strtotime($message->created_at)), $dataRaw);
        $dataRaw = str_replace("%interest%", $message->interest, $dataRaw);
        $dataRaw = str_replace("%email%", $message->email, $dataRaw);
        $dataRaw = str_replace("%firstName%", $message->firstName, $dataRaw);
        $dataRaw = str_replace("%lastName%", $message->lastName, $dataRaw);
        $dataRaw = str_replace("%phone%", $message->phone, $dataRaw);
        $dataRaw = str_replace("%message%", $message->message, $dataRaw);


        $curl = curl_init();

        try {

            curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.toyota.com.ar:9201/dcx/api/leads',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $dataRaw,
            CURLOPT_HTTPHEADER => array(
                'username: ' . env('SF_APILEAD_USERNAME', null),
                'password: ' . env('SF_APILEAD_PASSWORD', null),
                'dealer: DYV',
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return $response;

        } catch (Exception $e) {
            return $e;
        }

    }

    private function sendAutomaticResponseToClient($message)
    {
        Mail::to($message->email)
                ->send(new AutomaticResponser($message));
    }

}
