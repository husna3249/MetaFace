 
  import '../src/app/custom.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
export default function App({ Component, pageProps }) {
  return (
    <div className="backstyle">
      <Component {...pageProps} />
      
    </div>
  );
}
 


