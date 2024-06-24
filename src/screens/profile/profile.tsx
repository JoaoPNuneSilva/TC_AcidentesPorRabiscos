import { Header } from "../../components/Header";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { FaUserAstronaut, FaUserEdit } from "react-icons/fa";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { UploadButton } from "react-uploader";
import { AiFillPicture } from "react-icons/ai";
import { Uploader } from "uploader";


export const Profile = (): JSX.Element => {

  const hq = [
    {
      id: 123,
      nome: "Wolverine",
      descricao: "",
      rating: 4,
      photos: [
        'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952116/pw_-_01_pag_-_00.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952117/pw_-_01_pag_-_00b.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952119/pw_-_01_pag_-_01.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952120/pw_-_01_pag_-_02.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952122/pw_-_01_pag_-_04.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952123/pw_-_01_pag_-_05.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952126/pw_-_01_pag_-_08.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952127/pw_-_01_pag_-_09.jpg'
      ]
    },
    {
      id: 124,
      nome: "Wolverine a volta",
      descricao: "",
      rating: 1,
      photos: [
        'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952117/pw_-_01_pag_-_00b.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952119/pw_-_01_pag_-_01.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952120/pw_-_01_pag_-_02.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952122/pw_-_01_pag_-_04.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952123/pw_-_01_pag_-_05.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952126/pw_-_01_pag_-_08.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952127/pw_-_01_pag_-_09.jpg'
      ]
    },
    {
      id: 125,
      nome: "Wolverine a ida",
      descricao: "",
      rating: 5,
      photos: [
        'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952119/pw_-_01_pag_-_01.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952120/pw_-_01_pag_-_02.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952122/pw_-_01_pag_-_04.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952123/pw_-_01_pag_-_05.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952126/pw_-_01_pag_-_08.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952127/pw_-_01_pag_-_09.jpg'
      ]
    },
    {
      id: 126,
      nome: "Wolverine quase lá",
      descricao: "",
      rating: 4,
      photos: [
        'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952120/pw_-_01_pag_-_02.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952122/pw_-_01_pag_-_04.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952123/pw_-_01_pag_-_05.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952126/pw_-_01_pag_-_08.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952127/pw_-_01_pag_-_09.jpg'
      ]
    },
    {
      id: 127,
      nome: "Wolverine e seu vô Verine",
      descricao: "",
      rating: 1,
      photos: [
        'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952122/pw_-_01_pag_-_04.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952123/pw_-_01_pag_-_05.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952126/pw_-_01_pag_-_08.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952127/pw_-_01_pag_-_09.jpg'
      ]
    },
  ]

  const user = {
    id: 1,
    nome: "Jão Peter",
    sexo: "Masculino",
    idade: 22,
    banner: "https://wallpaper-house.com/data/out/12/wallpaper2you_494312.jpg",
    photo: "https://img.freepik.com/fotos-premium/uma-foto-de-um-personagem-de-anime-fofo-do-anime_960786-436.jpg?w=2000",
    descricao: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable"
  }
  const [name, setName] = useState<string>("Jão Peter")
  //@ts-ignore
  const [sexo, setSexo] = useState<string>("Masculino")
  //@ts-ignore
  const [profileImage, setProfileImage] = useState("");
  const [idade, setIdade] = useState<number>(22)
  //@ts-ignore
  const [descricao, setDescricao] = useState<string>("Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable")
  //@ts-ignore
  const [photo, setPhoto] = useState<string>("https://img.freepik.com/fotos-premium/uma-foto-de-um-personagem-de-anime-fofo-do-anime_960786-436.jpg?w=2000")
  //@ts-ignore
  const [banner, setBanner] = useState<string>("https://wallpaper-house.com/data/out/12/wallpaper2you_494312.jpg")
  
  const [editProfile, setEditProfile] = useState<boolean>(false)
  //@ts-ignore
  const [backgroundImage, setBackgroundImage] = useState("")

  const uploader = Uploader({
    apiKey: "free"
  });
  const options = {
    multi: false,
    mimeTypes: ["image/png", "image/jpg", "image/jpeg"],

  };

  return (
    <div className="w-full  min-h-[100vh] pb-12 relative">
      <img src="/fundo.png" className="w-full h-[100vh] object-cover fixed -z-10" alt="" />
      <Header />

      <div className="comic-neue-regular relative flex flex-col justify-between items-center text-white">
        <div className=" flex justify-center relative  xl:h-96 h-40 w-full bg-red-500">
          {editProfile &&
           <UploadButton
              uploader={uploader}
              options={options}
              onComplete={(files) => setBackgroundImage(files[0]?.fileUrl || "")}
            >
              {({ onClick }) => (
                <>
                  <button onClick={onClick} className="absolute w-full h-full text-purple-400 hover:bg-purple-950/30 bg-purple-900/20 flex  flex-row gap-2">
                    <div className="w-full lg:text-8xl text-3xl text-center h-full lg:items-center items-end px-4  justify-end lg:justify-center flex">

                      <AiFillPicture />
                    </div>
                  </button>
                </>
              )}
            </UploadButton>
            }
          <img src={user.banner} className='h-full w-full object-cover' alt="" />
          <div className="xl:w-80 xl:h-80 w-40 h-40 bg-black rounded-full flex justify-center items-center absolute lg:left-20 xl:left-4 2xl:left-20 xl:-bottom-40 -bottom-20 xl:p-4 p-1">
          {editProfile &&
            <UploadButton
              uploader={uploader}
              options={options}
              onComplete={(files) => setProfileImage(files[0]?.fileUrl || "")}
            >
              {({ onClick }) => (
                <>
                  <button onClick={onClick} className="z-10 text-purple-400 absolute rounded-full hover:bg-purple-950/30 bg-purple-900/20  flex h-full w-full flex-row gap-2">
                    <div className="w-full text-4xl text-center h-full items-center justify-center flex">

                      <FaUserAstronaut />
                    </div>
                  </button>
                </>
              )}
            </UploadButton>
            }
           
            <img src={user.photo} alt="" className={`w-full h-full object-cover rounded-full ${editProfile ? 'opacity-40' : ''}`} />
          </div>
        </div>
        <div className="grid grid-cols-4 w-full ">
          {editProfile ? (
            <div className="lg:col-span-1 col-span-4 xl:pt-44 pt-20 flex flex-col  justify-start items-center text-2xl px-2">
              <div className=" w-full flex flex-col justify-center items-center rounded-xl">
                <label className="text-purple-400 text-sm" >Nome</label>
                <input className="text-2xl capitalize bg-purple-400/10 outline-none rounded-xl text-center" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex gap-4 justify-around w-full text-lg flex-row">
                  <div className="flex flex-col">
                    <label className="text-purple-400 text-sm ml-2" >Sexo</label>
                    <div className="flex gap-8">
                      <div className="flex items-center">
                        <input type="checkbox" className=" outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10" />
                        <p className="text-white comic-neueregular text-sm ml-2">Masc</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className=" outline-none focus:border-purple-400 focus:border-2 px-2  rounded-xl h-10 text-purple-500" />
                        <p className="text-white comic-neueregular text-sm ml-2">Fem</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-purple-400 text-sm ml-2" >Idade</label>
                    {/*@ts-ignore */}
                    <input className="text-2xl capitalize bg-purple-400/10 outline-none w-40 rounded-xl text-center" value={idade} onChange={(e) => setIdade(e.value)} />
                  </div>
                </div>
                <hr className="border-purple-400 border-1 w-full my-1" />
                <div className="px-4 flex flex-col justify-start w-full items-start">
                  <p className="text-lg text-purple-400">Sobre</p>
                  <textarea className=" resize-none w-full h-40  text-sm capitalize bg-purple-400/10 outline-none  rounded-xl text-justify p-2" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                </div>
              </div>
              <div className="flex flex-row justify-between w-full px-4">

                <button className="bg-red-600 hover:opacity-90 p-2 rounded-xl text-lg flex items-center gap-2 mt-2" onClick={() => setEditProfile(false)}>
                  <GiCancel /> Cancelar
                </button>
                <button className="bg-green-700 hover:opacity-90 p-2 rounded-xl text-lg flex items-center gap-2 mt-2" onClick={() => setEditProfile(false)}>
                  <GiConfirmed /> Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-1 col-span-4 xl:pt-44 pt-20 flex flex-col  justify-start items-center text-2xl px-2">
              <div className=" w-full flex flex-col justify-center items-center rounded-xl">
                <p className="text-2xl capitalize">{user.nome}</p>
                <div className="flex justify-around w-full text-lg flex-row">
                  <p>{user.sexo}</p>
                  <p>{user.idade} anos</p>
                </div>
                <hr className="border-purple-400 border-1 w-full " />
                <div className="px-4 flex flex-col justify-start items-start">
                  <p className="text-lg text-purple-400">Sobre</p>
                  <p className=" text-sm text-justify">{user.descricao}</p>
                </div>
              </div>
              <button className="bg-[#180037] hover:opacity-90 mt-2 p-2 rounded-xl text-lg flex items-center gap-2" onClick={() => setEditProfile(true)}>
                <FaUserEdit /> Editar perfil
              </button>
            </div>
          )}
          <div className="lg:col-span-3 col-span-4 px-2 py-12 xl:mt-20">
            <h3 className="text-2xl lg:text-start text-center md:text-4xl">últimos quadrinhos lidos:</h3>
            <div className="grid xl:grid-cols-5 grid-cols-1 md:grid-cols-3">
              {hq.map((hq) => (
                <div key={hq.id} className="flex flex-col gap-4 items-center mt-4">
                  <p className="text-lg">{hq.nome}</p>
                  <img src={hq.photos[0]} alt="" className="w-40 h-60 object-cover rounded-xl" />
                  <div className="flex flex-col justify-center items-center">
                    <Rating
                      className="border-white"
                      name="size-large"
                      size="small"
                      value={hq.rating}
                      readOnly
                      emptyIcon={<StarIcon style={{ opacity: 0.40, color: 'white' }} fontSize="inherit" />}
                    />

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
