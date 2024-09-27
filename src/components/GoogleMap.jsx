

function GoogleMap() {
  const iframeUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d885.2664769706573!2d-58.969942921592676!3d-27.436056647159635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c539e570c95%3A0x2ff25acec2a6c7c5!2sToyota%20Derka%20y%20Vargas!5e0!3m2!1ses-419!2sar!4v1727448150283!5m2!1ses-419!2sar';

  return (
    <div>
      <iframe title="Mapa de Google" className="rounded-lg" src={iframeUrl} width="100%" height="400" />
    </div>
  );
}

export default GoogleMap;