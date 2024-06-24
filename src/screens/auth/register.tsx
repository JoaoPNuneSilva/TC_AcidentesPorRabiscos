import { Link } from "react-router-dom"
import { PiEyeClosedDuotone } from "react-icons/pi";
import { ImEye } from "react-icons/im";
import { useState } from "react";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { FaUserAstronaut } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { UserCreateDto, UserCreateDtoGenrerEnum } from "@/services/api-back";
import useUserHook from "@/hooks/useUserHook";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [yearsOld, setYearsOld] = useState(18);
    const [sex, setSex] = useState("");
    const [about, setAbout] = useState("");
    const [emailReceive, setEmailReceive] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1);

    const uploader = Uploader({
        apiKey: "free"
    });
    const options = {
        multi: false,
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"],

    };

    const { signUp } = useUserHook();

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    const togglePasswordVisibilityConfirm = () => {
        setShowPasswordConfirm((prevState) => !prevState);
    };
    const handleNextStep = async () => {
        let errors: any = {}
        if (step === 1) {
            if (username.length < 5) {
                errors.username = 'Insira o nome do usuário';
                setMessage(errors.username)
            }
            if (email.trim() === '' || !email || !email.includes('@') || !email.includes('.')) {
                errors.email = 'Insira um email válido';
                setMessage(errors.email)
            }
            if (!password || password.length < 8) {
                errors.password = 'Insira uma senha válida maior que 8 caracteres';
                setMessage(errors.password)
            }
            if (password !== passwordConfirm) {
                errors.passwordConfirm = 'As senhas não coincidem';
                setMessage(errors.passwordConfirm)
            }
            console.log(errors)
            if (Object.keys(errors).length > 1) {
                setMessage('Campos inválidos');
                return;
            } else if (Object.keys(errors).length === 1) {
                return;
            } else (
                setStep(2)
            )
        } else {
            if (!profileImage) {
                errors.profileImage = 'Insira uma foto de perfil';
                setMessage(errors.profileImage)
            }
            if (!backgroundImage) {
                errors.backgroundImage = 'Insira uma foto de capa';
                setMessage(errors.backgroundImage)
            }
            if (!yearsOld || yearsOld < 6 || yearsOld > 140) {
                errors.yearsOld = 'Insira uma idade válida';
                setMessage(errors.yearsOld)
            }
            if (!sex) {
                errors.genrer = 'Insira um sexo';
                setMessage(errors.genrer)
            }
            if (!about) {
                errors.about = 'Insira uma descrição';
                setMessage(errors.about)
            }
            if (Object.keys(errors).length > 1) {
                setMessage('Campos inválidos');
                return;
            } else if (Object.keys(errors).length === 1) {
                return;
            } else {





                const data: UserCreateDto = {
                    username: username,
                    email: email,
                    password: password,
                    profilePhoto: profileImage,
                    bannerPhoto: backgroundImage,
                    age: yearsOld,
                    genrer: sex === 'MALE' ? UserCreateDtoGenrerEnum.Male : UserCreateDtoGenrerEnum.Female,
                    about: about,

                }

                const response = await signUp(data);

                if (response.status !== 200 && response.status !== 201) {
                    //@ts-ignore
                    setMessage('Serviço indisponível, tente novamente mais tarde')
                }

            }


        }

    }


    return (
        <div className=" grid grid-cols-5 h-full w-full">
            <div className="w-full h-full col-span-2 hidden md:flex justify-center items-center bg-[#180037] relative">
                <img src="/logo-branca.png" className="w-[50%] h-[100vh] object-contain absolute" alt="" />
                <img src="/logo-marca-dagua.png" className="w-[80%] h-[100vh] object-contain absolute" alt="" />
            </div>
            <div className="relative flex-col flex gap-4 justify-center items-center p-1 md:p-0 col-span-5 md:col-span-3 h-[100vh] w-full bg-black">
                <img src="/fundo.png" className="w-full h-[100vh] object-cover absolute" alt="" />
                <h1 className="text-white text-3xl z-10 comic-neue-regular">Crie sua conta</h1>
                {step === 1 ? (<>
                    <div className="md:w-[80%] xl:w-[50%] w-full  flex flex-col md:p-12 p-4 gap-4 bg-black/70 rounded-xl z-10 relative">
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Nome de usuário</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className=" outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className=" outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-purple-400 comic-neue-regular text-xl ml-2">Senha</label>
                            <div className="flex flex-row relative">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="w-full outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10" />
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform z-10 -translate-y-1/2 right-4 focus:outline-none text-black"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <ImEye /> : <PiEyeClosedDuotone />}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-purple-400 comic-neue-regular text-xl ml-2">Confirmar Senha</label>
                            <div className="flex flex-row relative">
                                <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type={showPasswordConfirm ? "text" : "password"} className="w-full outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10" />
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform z-10 -translate-y-1/2 right-4 focus:outline-none text-black"
                                    onClick={togglePasswordVisibilityConfirm}
                                >
                                    {showPasswordConfirm ? <ImEye /> : <PiEyeClosedDuotone />}
                                </button>
                            </div>

                            {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}
                        </div>
                        <img src="/jeff-2.png" className="md:w-40 w-20 object-contain -left-36 bottom-0 absolute" alt="" />

                    </div>
                    <button className="bg-[#180037] hover:opacity-90 comic-neue-regular text-white md:w-80 w-64 rounded-xl text-2xl h-10 z-10" onClick={() => handleNextStep()}>
                        Próximo
                    </button>
                </>) : (<>
                    <div className="md:w-[80%] xl:w-[50%] w-full  flex flex-col md:p-12 p-4 gap-4 bg-black/70 rounded-xl z-10 relative">
                        <div className="felx flex-col">
                            <div className="flex">
                                <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Foto de perfil e capa</label>

                                <UploadButton
                                    uploader={uploader}
                                    options={options}
                                    onComplete={(files) => setProfileImage(files[0]?.fileUrl || "")}
                                >
                                    {({ onClick }) => (
                                        <>
                                            <button onClick={onClick} className="bg-[#180037] ml-4 text-purple-400 hover:bg-[#180037]/90 flex rounded-xl h-10 w-10 flex-row gap-2">
                                                <div className="w-full text-3xl text-center h-full items-center justify-center flex">

                                                    <FaUserAstronaut />
                                                </div>
                                            </button>
                                        </>
                                    )}
                                </UploadButton>
                                <UploadButton
                                    uploader={uploader}
                                    options={options}
                                    onComplete={(files) => setBackgroundImage(files[0]?.fileUrl || "")}
                                >
                                    {({ onClick }) => (
                                        <>
                                            <button onClick={onClick} className="bg-[#180037] ml-4 text-purple-400 hover:bg-[#180037]/90 flex rounded-xl h-10 w-10 flex-row gap-2">
                                                <div className="w-full text-3xl text-center h-full items-center justify-center flex">

                                                    <AiFillPicture />
                                                </div>
                                            </button>
                                        </>
                                    )}
                                </UploadButton>
                            </div>
                            <div className="rounded-xl border-dashed border border-white flex justify-center items-center w-full h-40 relative">
                                {backgroundImage ? <img src={backgroundImage} className=" absolute w-full h-full object-cover rounded-xl" alt="" /> :
                                    <div className="absolute w-full h-full bg-[#180037]/80 rounded-xl flex justify-end items-end text-2xl p-4">
                                        <AiFillPicture className="text-[#26143d]" />
                                    </div>
                                }
                                <div className=" h-32 w-32 border-dashed border border-white rounded-full z-10 relative">
                                    {profileImage ? <img src={profileImage} className="w-full h-full object-cover rounded-full" alt="" /> :
                                        <div className="absolute w-full h-full bg-purple-400/80 rounded-full  flex justify-center text-center items-center text-7xl">
                                            <FaUserAstronaut className="text-purple-400" />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col lg:w-full w-20">
                                <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Idade</label>
                                {/* @ts-ignore */}
                                <input value={yearsOld} onChange={(e) => setYearsOld(e.value)} type="Number" className=" outline-none focus:border-purple-400 focus:border-2 px-2   rounded-xl h-10" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Sexo</label>
                                <div className="flex gap-8">

                                    <div className="flex items-center">
                                        <input checked={sex === 'MALE'} onChange={() => setSex('MALE')} type="checkbox" className=" outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10" />
                                        <p className="text-white comic-neueregular text-sm ml-2">Masc</p>
                                    </div>
                                    <div className="flex items-center">
                                        <input checked={sex === 'FEMALE'} onChange={() => setSex('FEMALE')} type="checkbox" className=" outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10 text-purple-500" />
                                        <p className="text-white comic-neueregular text-sm ml-2">Fem</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Sobre você</label>
                            <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="resize-none outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl md:h-32 h-20" />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center justify-center">
                                <input checked={emailReceive} onChange={() => setEmailReceive(!emailReceive)} type="checkbox" className=" outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10 text-purple-500" />
                                <p className="text-white comic-neueregular text-sm ml-2">Aceito receber informações por email.</p>
                            </div>
                        </div>
                        {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}
                        <img src="/jeff-2.png" className="md:w-40 w-20 object-contain -left-36 bottom-0 absolute" alt="" />

                    </div>
                    <button className="bg-[#180037] hover:opacity-90 comic-neue-regular text-white md:w-80 w-64 rounded-xl text-2xl h-10 z-10" onClick={() => handleNextStep()}>
                        Criar conta
                    </button>
                </>)}
                <p className="comic-neue-regular text-white z-10">Já possui conta? <Link to={'/login'} className="text-purple-400 text-lg cursor ">Fazer Login</Link></p>
            </div>
        </div>
    )
}

export default Register