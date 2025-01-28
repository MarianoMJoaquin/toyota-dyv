function GoogleMap({ location = 'resistencia' }) {
  // Objeto con las URLs reales de cada sucursal
  const mapUrls = {
    'resistencia': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.4826614289127!2d-58.952836125737214!3d-27.423064814718614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450dbbf2426f97%3A0xf7ab8afd16b0dc53!2sToyota%20Derka%20y%20Vargas!5e0!3m2!1ses-419!2sar!4v1738017000296!5m2!1ses-419!2sar',
    'villa-angela': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8463130618384!2d-60.711304600000005!3d-27.567279799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9447a9d0f396d03d%3A0xac443377112e2883!2sDerka%20y%20Vargas!5e0!3m2!1ses-419!2sar!4v1738017057683!5m2!1ses-419!2sar',
    'charata': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.962290823871!2d-61.1715126!3d-27.220333699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94475b7696ec13dd%3A0xc2e710da3a26c8cc!2sDerka%20y%20Vargas!5e0!3m2!1ses-419!2sar!4v1738016721660!5m2!1ses-419!2sar',
    'saenz-pena': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.738226055733!2d-60.438034200000004!3d-26.784613099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94412d1c14ba7d7b%3A0x3f41780d9ada61c!2sDerka%20y%20Vargas!5e0!3m2!1ses-419!2sar!4v1738016890637!5m2!1ses-419!2sar'
  };

  // Validar que la ubicación existe
  if (!mapUrls[location]) {
    console.error(`La localidad "${location}" no se encuentra. Por defecto, se mostrará Resistencia.`);
    location = 'resistencia';
  }

  return (
    <div className="w-full h-full">
      <iframe 
        title={`Mapa de ${location}`} 
        className="w-full h-full rounded-lg"
        src={mapUrls[location]} 
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen=""
      />
    </div>
  );
}

export default GoogleMap;


