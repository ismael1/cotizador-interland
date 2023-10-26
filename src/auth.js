import axios from "axios";

//const ENDPOINT_PATH = "http://127.0.0.1:8000/";

const ENDPOINT_PATH = "http://sicolog.ifreight.business/";

export default {

//   prueba(){

      
//     let arrayOrigen=[]

//     arrayOrigen=[{ "id": 1, "name": "FLETE NACIONAL" },
//         { "id": 2, "name": "INTERNATIONAL FREIGHT" },
//         { "id": 3, "name": "FLETE DIRECTO" },
//         { "id": 10, "name": "OTRO" }];

//     return arrayOrigen;
//   },

  register(username,email, password) {

    axios({
        method: "post",
        url: ENDPOINT_PATH + "user/",
        data: {
            username:username,
            email:email,
            password:password,
        },
        auth: {
            username: "admin",
            password: "123",
        },
    })
    .then((response) => {

        // if(response){
            return response;  
        // }  
    })
    .catch((error) => {

        let array_error = []
        let arr = Array(error.response.data)

        let arr_fin

        
        let valores_username=''
        let valores_email=''
        let valores_password=''
        let valor_array=''

        if(arr.length > 0){
            for (let index in arr) {
                valor_array=''

                valores_username= arr[index].username
                valores_email= arr[index].email
                valores_password= arr[index].password

                if(arr[index].username){
                    valor_array={"campo": valores_username[0]}
                    array_error.push(valor_array)
                }
                if(arr[index].email){
                    valor_array={"campo": valores_email[0]} 
                    array_error.push(valor_array)
                }
                if(arr[index].password){
                    valor_array={"campo": valores_password[0]}   
                    array_error.push(valor_array)
                }   

            }

            arr_fin=Array(array_error)
            return arr_fin
        }else{
            return "no valor"
        }
        // console.log(error.response.data)
        // err=>console.log('Response body', err.response.data
        // return error.response.data;
        // return "error";

    });
  },


  //para el login
  login(email, password) {

    axios({
        method: "post",
        url: ENDPOINT_PATH + "api/v1/validateUser/",
        data: {
            email:email,
            password:password,
        },
        auth: {
            username: "admin",
            password: "123",
        },
    })
    .then((response) => {

        if(response){
            return true;  
        } 
    })
    .catch((error) => {
        return error;
        console.log(error);
    });
  }

};