<template>
	<div class="wrapper">
		<div class="container">
			<div class="text-center">
				<h1>Solicitar Turno</h1>
			</div>
			<div class="row d-flex justify-content-center section">
				<div class="col-11 col-md-6 col-lg-6">
					<div class="text-center">
						<p>Dejanos tus datos y estaremos en contacto con usted a la brevedad para confirmar la fecha y hora del turno.</p>
					</div>
					<div id="contact-form">
						<form ref="contactform" action="#" method="POST" role="form" autocomplete="off" class="w-100" @submit.prevent="onSubmit">
							<input type="hidden" name="from" value="web-site">
							<div class="form-group row">
								<div class="col-md-12">
									<div class="validate-input">
										<input type="text"
											   v-model="turno.cliente"
											   name="cliente"
											   placeholder="Apellido y Nombre"
											   :class="{'custom-input-text form-control':true, 'is-invalid' : invalidCliente}">
										<label for="cliente" class="label-custom-input-text"><i class="fas fa-user"></i></label>
										<div class="invalid-feedback">{{ invalidClienteText}}</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-md-12">
									<div class="validate-input">
										<input type="number"
											   v-model="turno.telefono"
											   name="telefono"
											   placeholder="Teléfono"
											   :class="{'custom-input-text form-control':true, 'is-invalid' : invalidTelefono}">
										<label for="telefono" class="label-custom-input-text"><i class="fas fa-phone-alt"></i></label>
										<div class="invalid-feedback">{{ invalidTelefonoText}}</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-md-12">
									<div class="validate-input">
										<input type="email"
										       v-model="turno.email"
										       name="email"
										       placeholder="Correo electrónico"
										       :class="{'custom-input-text form-control':true, 'is-invalid' : invalidEmail}">
										<label for="email" class="label-custom-input-text"><i class="fas fa-envelope"></i></label>
										<div class="invalid-feedback">{{ invalidEmailText}}</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-md-12">
									<div class="validate-input">
										<select v-model="turno.sucursal"
												name="sucursal"
												:class="{'custom-input-text form-control':true, 'is-invalid' : invalidSucursal}">
											<option value="">Seleccione una Sucursal</option>
											<option v-for="sucursal in sucursales" :key="sucursal" :value="sucursal">{{sucursal}}</option>
										</select>
										<label for="sucursal" class="label-custom-input-text"><i class="fas fa-map-marker-alt"></i></label>
										<div class="invalid-feedback">{{ invalidSucursalText}}</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-md-12">
									<div class="validate-input">
										<input type="date"
										       v-model="turno.fecha"
										       name="fecha"
										       :class="{'custom-input-text form-control':true, 'is-invalid' : invalidFecha}">
										<label for="fecha" class="label-custom-input-text"><i class="fas fa-calendar-day"></i></label>
										<div class="invalid-feedback">{{ invalidFechaText}}</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-7">
									<div class="validate-input">
										<select v-model="turno.modelo"
												name="modelo"
												:class="{'custom-input-text form-control':true, 'is-invalid' : invalidModelo}">
											<option value="">Seleccione un Modelo</option>
											<option v-for="modelo in modelos" :key="modelo" :value="modelo">{{ modelo }}</option>
										</select>
										<label for="modelo" class="label-custom-input-text"><i class="fas fa-car"></i></label>
										<div class="invalid-feedback">{{ invalidModeloText}}</div>
									</div>
								</div>
								<div class="col-5">
									<div class="validate-input">
										<input v-model="turno.dominio"
												name="dominio"
												type="text"
												placeholder="Dominio"
												:class="{'custom-input-text form-control':true, 'is-invalid' : invalidDominio}">
										<label for="domiio" class="label-custom-input-text"><i class="far fa-window-maximize"></i></label>
										<div class="invalid-feedback">{{ invalidDominioText}}</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-12">
									<div class="validate-input">
										<select v-model="turno.servicio"
												name="servicio"
												:class="{'custom-input-text form-control':true, 'is-invalid' : invalidServicio}">
											<option value="">Seleccione un Servicio</option>
											<option v-for="servicio in servicios" :key="servicio" :value="servicio">{{ servicio }}</option>
										</select>
										<label for="servicio" class="label-custom-input-text"><i class="fas fa-tools"></i></label>
										<div class="invalid-feedback">{{ invalidServicioText}}</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-md-12">
									<div class="validate-input">
										<textarea v-model="turno.comentario"
												  name="comentario"
												  class="form-control custom-input-text label-custom-input-text-area"></textarea>
											<label for="comentario" class="label-custom-input-text"><i class="fas fa-pen"></i>
										</label>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-md-5 d-flex align-items-center mt-3">
									<recaptcha @error="onError" @success="onSuccess" @expired="onExpired" />
									<button :disabled="status==='submitting'" type="submit" class="button button-dark btn-block">
										<i class="fas fa-paper-plane"></i> ENVIAR
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import axios from '~/plugins/axios'
  	const endpoints = require('~/constants/endpoints');

  	export default {
		head(){
          return {
	            title: 'Toyota Derka y Vargas | Solicitud de turno',
	            meta: [
	                {hid: "description", name: "description", content: this.description},
	                {hid: "og:description", property: "og:description", content: this.description},
	                {hid: "og:title", property: "og:title", content: this.title},
	                {hid: 'og:image', property: 'og:image', content: this.image },
	                {hid: 'og:url', property: 'og:url', content: this.url },
	                {hid: 'og:type', property: 'og:type', content: this.type }
	            ],
	            htmlAttrs: {
	              lang: 'es'
	            }
	          }
	    },
	    computed: {
	          title() {
	            return 'Toyota Derka y Vargas | Solicitud de turno';
	          },
	          description() {
	            return 'Turnos online. Solicitá un turno online y dejá tu Toyota en las mejores manos.';
	          },
	          url() {
	            return 'https://derkayvargas.com/servicios-y-accesorios/servicios/solicitud-de-turno';
	          },
	          image() {
	            return 'https://test.derkayvargas.com/logo-og.jpg';
	          },
	          type() {
	            return 'website';
	          },
	    },
        data(){
        	return {
				turno: { sucursal: '', modelo: '', servicio: '' },
				modelos: ['C-HR','Camry','Corolla','Etios','86','Hiace','Hilux','Innova','Land Cruiser','Prius','Rav4','SW4','Yaris'],
				servicios: ['10.000 KM', '20.000 KM', '30.000 KM', '40.000 KM', '50.000 KM', '60.000 KM', '70.000 KM', '80.000 KM', '90.000 KM', '100.000 KM', '110.000 KM', '120.000 KM', '130.000 KM', '140.000 KM', '150.000 KM', 'Otro'],
				sucursales: ['Sáenz Peña','Resistencia','Charata'],
				status: '',
				invalidCliente: false,
				invalidClienteText: '',
				invalidTelefono: false,
				invalidTelefonoText: '',
				invalidEmail: false,
				invalidEmailText: '',
				invalidSucursal: false,
				invalidSucursalText: '',
				invalidFecha: false,
				invalidFechaText: '',
				invalidServicio: false,
				invalidServicioText: '',
				invalidModelo: false,
				invalidModeloText: '',
				invalidDominio: false,
				invalidDominioText: '',
        	}
        },
        mounted(){},
        methods:{
        	async onSubmit() {
		      try {
		        const token = await this.$recaptcha.getResponse()
		        await this.$recaptcha.reset()
		      } catch (error) {
		        // eslint-disable-next-line no-console
		        console.log('Login error:', error)
		      }
		    },
		    onSuccess(recaptchaToken) {
		      	const self = this;
		      	this.status = "submitting";

		      	let formData = new FormData(this.$refs.contactform);

        		axios
	        		.post(endpoints.SOLICITUD_TURNO_SERVICIO, formData)
	        		.then(res=>{
	        			this.resetValidationForm();
	        			this.turno = { sucursal: '', modelo: '', servicio: '' };
	        			notifier.show('Turno Solicitado' , 'Estaremos en contacto con usted a la brevedad para confirmar el turno.', 'success', '/success.png', 0);
	        			console.log(res);
	        		})
	        		.catch(error=>{
	        			self.resetValidationForm();
	        			if (error.response.data.code == 422) {
				          if (error.response.data.error.cliente){
				          	self.invalidCliente = true;
				          	self.invalidClienteText = error.response.data.error.cliente[0];
				          }
				          if (error.response.data.error.telefono){
				          	self.invalidTelefono = true;
				          	self.invalidTelefonoText = error.response.data.error.telefono[0];
				          }
				          if (error.response.data.error.email){
				          	self.invalidEmail = true;
				          	self.invalidEmailText = error.response.data.error.email[0];
				          }
				          if (error.response.data.error.sucursal){
				          	self.invalidSucursal = true;
				          	self.invalidSucursalText = error.response.data.error.sucursal[0];
				          }
				          if (error.response.data.error.fecha){
				          	self.invalidFecha = true;
				          	self.invalidFechaText = error.response.data.error.fecha[0];
				          }
				          if (error.response.data.error.dominio){
				          	self.invalidDominio = true;
				          	self.invalidDominioText = error.response.data.error.dominio[0];
				          }
				          if (error.response.data.error.modelo){
				          	self.invalidModelo = true;
				          	self.invalidModeloText = error.response.data.error.modelo[0];
				          }
				          if (error.response.data.error.servicio){
				          	self.invalidServicio = true;
				          	self.invalidServicioText = error.response.data.error.servicio[0];
				          }
				        }else{
				        	alert('Ups, algo salió mal. Por favor intente nuevamente más tarde.')
				        	notifier.show('Ups! Algo salió mal.' , 'Por favor intente nuevamente más tarde.', 'danger', '/danger.png', 30000);
				        }
	        		})

		    },
		    onExpired() {
		      console.log('Expired')
		    },
		     onError(error) {
		      console.log('Error happened:', error)
		    },
		    resetValidationForm(){
		    	this.status = '';

		        this.invalidCliente = false;
	          	this.invalidClienteText = '';
	          	this.invalidTelefono = false;
	          	this.invalidTelefonoText = '';
	          	this.invalidEmail = false;
	          	this.invalidEmailText = '';
	          	this.invalidSucursal = false;
	          	this.invalidSucursalText = '';
	          	this.invalidFecha = false;
	          	this.invalidFechaTextText = '';
	          	this.invalidModelo = false;
	          	this.invalidModeloTextText = '';
	          	this.invalidDominio = false;
	          	this.invalidDominioTextText = '';
	          	this.invalidServicio = false;
	          	this.invalidServicioTextText = '';

		    }
        }
    }
</script>
