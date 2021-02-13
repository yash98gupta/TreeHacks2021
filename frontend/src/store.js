import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();


export let user = null;
export const auto_login = () => {
    const token = cookies.get('token');
    if(token!=null){
   
      axios.post('http://localhost:8000/auth/auto_login',{token})
      .then((response)=>{
        user = response.data
        console.log(user.email,"user email")
      })
      console.log('Login Success')
    }
    
}

