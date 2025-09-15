import Footer from '../Footer';

export default function FooterExample() {
  return (
    <Footer
      onSubscribeNewsletter={(email) => console.log('Subscribe newsletter:', email)}
      onContactEmergency={(type) => console.log('Emergency contact:', type)}
    />
  );
}