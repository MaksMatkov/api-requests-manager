import { createRoot } from 'react-dom/client';
import App from './App';
import { httpMethodService } from './services/HttpMethodService';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);



httpMethodService.LoadAll().then(res => {
  console.log(res);
})



