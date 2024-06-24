import useAuthHook from "@/hooks/useAuthHook";
import { useState } from "react";
import { ImEye } from "react-icons/im";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { Link } from "react-router-dom"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMWUxOWM3NzYtM2QxZS00Yjc2LTk1YTgtZDc5NzU3NTA1MWY4IiwidXNlcm5hbWUiOiJSeWFuIFJhZmFlbCIsImVtYWlsIjoicnlhbkBnbWFpbC5jb20iLCJwcm9maWxlUGhvdG8iOiJodHRwczovL3d3dy5nb29nbGUuY29tL3VybD9zYT1pJnVybD1odHRwcyUzQSUyRiUyRmJyLnBpbnRlcmVzdC5jb20lMkZrYXVhdmljdG9yYWRyJTJGZm90b3MtcGVyZmlsLWFuaW1lJTJGJnBzaWc9QU92VmF3M3lJLUhuRWNic1N0dHhpMHo2SmhTZCZ1c3Q9MTcxOTA5NTM1MDQ3NDAwMCZzb3VyY2U9aW1hZ2VzJmNkPXZmZSZvcGk9ODk5Nzg0NDkmdmVkPTBDQkVRalJ4cUZ3b1RDTmlsdktfZjdZWURGUUFBQUFBZEFBQUFBQkFFIiwiYmFubmVyUGhvdG8iOiJodHRwczovL3QuY3RjZG4uY29tLmJyL2tkSFVKMXlyaU5GN2RxU2RYMnNYYjRPVGF2ND0vMzQweDI2NToxNjU0eDEwMDUvMTMxNHg3Mzkvc21hcnQvaTUyMTc0Ny5qcGVnIiwiYWdlIjoxOCwiZ2VuZGVyIjoiTUFMRSIsImFib3V0Ijoic3RyaXNmc2Rmc2Rmc2Rmc2Rmc2Rmc2Rmc2Rmc2Rmc2Rmc25nIiwidHlwZSI6IlZJU0lUQU5UIiwiY3JlYXRlZEF0IjoiMjAyNC0wNi0yMVQyMjozMDowNS41ODRaIiwidXBkYXRlZEF0IjoiMjAyNC0wNi0yMVQyMjozMDowNS41ODRaIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNzE5MDA5MDA2fQ.sJTRCvRBgSbbhVIe-1ZftumQsx8yVZ918T1QwSUEBUY

    const { signIn } = useAuthHook();

    const handleLogin = async () => {
        let errors: any = {}
        setEmailError(false);
        setPasswordError(false);
        setErrorMessage('');

        if (email.trim() === '') {
            setEmailError(true);
            errors.email = 'Insira o nome do usuário';

            
        }
        else {
            setEmailError(false);
        }
        if (email.length < 5) {
            setEmailError(true);
            errors.email = 'Nome de usuário válido';
        } else {
            setEmailError(false);
        }

        if (password.trim() === '') {
            setPasswordError(true);
            errors.password = 'Insira uma senha';
            
        } else {
            setPasswordError(false);
        }
        if (password.length < 8) {
            setPasswordError(true);
            errors.password = 'A senha deve ter no mínimo 8 caracteres';
        }
         else {
            setPasswordError(false);
        }
        if (Object.keys(errors).length > 1) {
            setErrorMessage('Campos inválidos');
            return 
        }
        else if (Object.keys(errors).length === 1) {
            setErrorMessage(errors[Object.keys(errors)[0]]);
            return 

        }
        else {
            setErrorMessage('');
            errors = {};
        }

        const response = await signIn(email, password);
        console.log(response);
        if (response.status === 200) {
            //@ts-ignore
            localStorage.setItem('token', response.data);
        }

        console.log('Email:', email);
        console.log('Password:', password);
    };



    return (
        <div className="grid grid-cols-5 h-full w-full">
            <div className="w-full h-full col-span-2 hidden md:flex justify-center items-center bg-[#180037] relative">
                <img src="/logo-branca.png" className="w-[50%] h-[100vh] object-contain absolute" alt="" />
                <img src="/logo-marca-dagua.png" className="w-[80%] h-[100vh] object-contain absolute" alt="" />
            </div>
            <div className="relative flex-col flex gap-4 justify-center items-center p-1 md:p-0 col-span-5 md:col-span-3 h-[100vh] w-full bg-black">
                <img src="/fundo.png" className="w-full h-[100vh] object-cover absolute" alt="" />
                <h1 className="text-white text-3xl z-10 comic-neue-regular">Faz login ae!</h1>
                <div className="md:w-[80%] xl:w-[50%] w-full flex flex-col md:p-12 p-4 gap-4 bg-black/70 rounded-xl z-10">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-purple-400 comic-neueregular text-xl ml-2">Nome de usuário</label>
                        <input 
                            id="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="text" 
                            className={`outline-none px-2 rounded-xl h-10 ${emailError ? 'border-2 border-red-500' : 'focus:border-purple-400 focus:border-2'}`} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-purple-400 comic-neue-regular text-xl ml-2">Senha</label>
                        <div className="flex flex-row relative">
                            <input 
                                id="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type={showPassword ? "text" : "password"} 
                                className={`w-full outline-none px-2 rounded-xl h-10 ${passwordError ? 'border-2 border-red-500' : 'focus:border-purple-400 focus:border-2'}`} 
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 transform z-10 -translate-y-1/2 right-4 focus:outline-none text-black"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <ImEye /> : <PiEyeClosedDuotone />}
                            </button>
                        </div>
                        <Link to={'/reset-password'} className="text-purple-400/80 ml-2 text-sm comic-neue-regular">Esqueceu a senha?</Link>
                    </div>
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    <img src="/jeff-1.png" className="md:w-40 w-20 object-contain right-0 top-8 absolute" alt="" />
                </div>
                <button 
                    className="bg-[#180037] hover:opacity-90 comic-neue-regular text-white md:w-80 w-64 rounded-xl text-2xl h-10 z-10"
                    onClick={handleLogin}
                >
                    Entrar
                </button>
                <p className="comic-neue-regular text-white z-10">Não possui conta? <Link to={'/register'} className="text-purple-400 text-lg cursor">Crie uma!</Link></p>
                <p className="absolute bottom-4 comic-neue-regular text-white/40 text-center">Criado por João Pedro Nunes da Silva & Matheus Batista Rosignol</p>
            </div>
        </div>
    );
};

export default Login;
