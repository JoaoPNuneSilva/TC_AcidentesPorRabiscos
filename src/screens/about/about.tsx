import { Header } from "../../components/Header";
import { useState } from "react";
import { FaUserAstronaut, FaUserEdit } from "react-icons/fa";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { UploadButton } from "react-uploader";
import { AiFillPicture } from "react-icons/ai";
import { Uploader } from "uploader";
import { Link } from 'react-router-dom';

export const About = (): JSX.Element => {
  const user = {
    id: 1,
    nome: "João Pedro Nunes da Silva",
    sexo: "Masculino",
    idade: 22,
    banner: "https://t.ctcdn.com.br/cHEKgB_EAQmn6Da18aX14H5FSjc=/1200x675/smart/i407979.jpeg",
    photo: "/jao.jpg",
    descricao: `Olá! Primeiramente, muito obrigado a você que está acessando este site dos meus quadrinhos autorais, é uma imensa gratidão e satisfação que tenho em estar disponibilizando estas histórias malucas que saem de minha cabeça totalmente sã.
Bem, deixe eu me apresentar, me chamo João Pedro Nunes da Silva, sou Ivaiporã-PR e amo muito quadrinhos! Como quase todo brasileiro, meu primeiro contato com quadrinho foi com um gibi da Turma da Mônica, porém, eu era e ainda sou, muito fã do melhor super-herói de todos, o Homem-Aranha, e quando descobri que ele era um personagem de quadrinhos, fiquei completamente doido. Descobri isso quando um colega de escola chegou com uma HQ que contava a história resumida de Homem-Aranha 3 do Sam Raimi, eu achei aquilo incrível, então corri pro meu pai e contei pra ele dizendo que eu queria Histórias em Quadrinhos, e ele me levou ao Café da Praça, um lugar onde vendia-se jornais, revistas, livros, etc. Comprei logo duas HQs do Ben 10 e uma do Max Steel, e este foi o meu início com quadrinhos, mas desde pequeno eu já desenha bastante, minha mãe me ensinava a colocar as capas de filmes abaixo da folha e desenhar, até que eu comecei a apenas olhar para as capas e tentar reproduzir no papel, e assim fui fazendo até que com o passar dos anos, alguns desenhos foram ficando legais, e depois de conhecer os quadrinhos, eu coloquei na cabeça “eu quero desenhar quadrinhos, quero trabalhar pra Marvel e conhecer o Stan Lee”.
Foi somente no ensino médio fazendo um trabalho em grupo sobre histórias em quadrinhos, que eu desenhei uma HQ de 4 páginas roteirizada por um dos colegas do grupo, e com este trabalho e também descobri que não precisava trabalhar pra alguém para poder contar histórias com desenhos, afinal, trabalhando pra alguém, minha história teria de ser aprovada pra ai ir para a fase de desenho, porém, trabalhando pra mim, eu posso fazer a história que eu quiser tento total responsabilidade dos benefícios e consequências.
Sendo assim, este site é por um único motivo, algum dia, eu quero ter um quadrinho que seja reconhecido no Brasil, e você que está aqui, contribui pra que eu chegue a este objetivo algum dia, e mesmo que não chegue, ao menos não desisti de um sonho.`,
  }

  const [name, setName] = useState<string>(user.nome);
  //@ts-ignore
  const [profileImage, setProfileImage] = useState<string>(user.photo);
  const [idade, setIdade] = useState<number>(user.idade);
  const [descricao, setDescricao] = useState<string>(user.descricao);
  //@ts-ignore
  const [photo, setPhoto] = useState<string>(user.photo);
  //@ts-ignore
  const [banner, setBanner] = useState<string>(user.banner);
  
  //@ts-ignore
  const [editProfile, setEditProfile] = useState<boolean>(false);
  //@ts-ignore
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const uploader = Uploader({ apiKey: "free" });
  const options = {
    multi: false,
    mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
  };

  return (
    <div className="w-full min-h-[100vh] pb-12 relative">
      <img src="/fundo.png" className="w-full h-[100vh] object-cover fixed -z-10" alt="" />
      <Header />

      <div className="comic-neue-regular relative flex flex-col justify-between items-center text-white">
        <div className="flex justify-center relative xl:h-96 h-40 w-full bg-red-500">
          {editProfile && (
            <UploadButton
              uploader={uploader}
              options={options}
              onComplete={(files) => setBackgroundImage(files[0]?.fileUrl || "")}
            >
              {({ onClick }) => (
                <button onClick={onClick} className="absolute w-full h-full text-purple-400 hover:bg-purple-950/30 bg-purple-900/20 flex flex-row gap-2">
                  <div className="w-full lg:text-8xl text-3xl text-center h-full lg:items-center items-end px-4 justify-end lg:justify-center flex">
                    <AiFillPicture />
                  </div>
                </button>
              )}
            </UploadButton>
          )}
          <img src={banner} className='h-full w-full object-cover' alt="" />
          <div className="xl:w-80 xl:h-80 w-40 h-40 bg-black rounded-full flex justify-center items-center absolute lg:left-1/2 transform lg:-translate-x-1/2 xl:-bottom-40 -bottom-20 xl:p-4 p-1">
            {editProfile && (
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) => setProfileImage(files[0]?.fileUrl || "")}
              >
                {({ onClick }) => (
                  <button onClick={onClick} className="z-10 text-purple-400 absolute rounded-full hover:bg-purple-950/30 bg-purple-900/20 flex h-full w-full flex-row gap-2">
                    <div className="w-full text-4xl text-center h-full items-center justify-center flex">
                      <FaUserAstronaut />
                    </div>
                  </button>
                )}
              </UploadButton>
            )}
            <img src={photo} alt="" className={`w-full h-full object-cover rounded-full ${editProfile ? 'opacity-40' : ''}`} />
          </div>
        </div>
        <div className=" w-full ">
          {editProfile ? (
            <div className="lg:col-span-1 col-span-4 xl:pt-44 pt-20 flex flex-col justify-start items-center text-2xl px-2">
              <div className="w-full flex flex-col justify-center items-center rounded-xl">
                <label className="text-purple-400 text-sm">Nome</label>
                <input className="text-2xl capitalize bg-purple-400/10 outline-none rounded-xl text-center" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex gap-4 justify-around w-full text-lg flex-row">
                  <div className="flex flex-col">
                    <label className="text-purple-400 text-sm ml-2">Sexo</label>
                    <div className="flex gap-8">
                      <div className="flex items-center">
                        <input type="checkbox" className="outline-none focus:border-purple-400 focus:border-2 px-2 rounded-xl h-10" />
                        <p className="text-white comic-neueregular text-sm ml-2">Masc</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="outline-none focus:border-purple-400 focus:border-2 px-2 rounded-xl h-10 text-purple-500" />
                        <p className="text-white comic-neueregular text-sm ml-2">Fem</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-purple-400 text-sm ml-2">Idade</label>
                    <input className="text-2xl capitalize bg-purple-400/10 outline-none w-40 rounded-xl text-center" value={idade} onChange={(e) => setIdade(Number(e.target.value))} />
                  </div>
                </div>
                <hr className="border-purple-400 border-1 w-full my-1" />
                <div className="px-4 flex flex-col justify-start w-full items-start">
                  <p className="text-lg text-purple-400">Sobre</p>
                  <textarea className="resize-none w-full h-40 text-sm capitalize bg-purple-400/10 outline-none rounded-xl text-justify p-2" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
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
            <div className="col-span-4 xl:pt-44 pt-20 flex flex-col justify-start items-center text-2xl px-2">
              <div className="w-full flex flex-col justify-center items-center rounded-xl">
                <p className="text-5xl capitalize">{user.nome}</p>
                <div className="flex justify-around w-full text-lg flex-row">
                  <p>{user.sexo}</p>
                  <p>{user.idade} anos</p>
                </div>
                <hr className="border-purple-400 border-1 w-full" />
                <div className="px-4 flex flex-col justify-start items-start">
                  <p className="text-4xl text-purple-400">Sobre</p>
                  <p className="text-2xl text-justify">{user.descricao}</p>
                </div>  
                <br />
                <hr className="border-purple-400 border-1 w-full" />
              </div>
              <div className="flex items-center space-x-20">
                <button className="bg-[#180037] hover:opacity-90 mt-2 p-2 rounded-xl text-lg flex items-center gap-2" onClick={() => setEditProfile(true)}>
                  <FaUserEdit /> Editar perfil
                </button>
                <button className="bg-[#180037] hover:opacity-90 mt-2 p-2 rounded-xl text-lg flex items-center gap-2">
                <Link to='/uploadcomic'>
                   Lançar Quadrinho
                </Link>
                   
                </button>
              </div>
            </div>
            
          )}
          <br />
          <br />

          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-4xl text-purple-400">Contato</p>
            <div className="flex justify-center space-x-20 mt-4">
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <p className="text-3xl text-wait">Telefone:</p>
                  <div className="flex items-center space-x-1">
                  <img src="https://logopng.com.br/logos/whatsapp-33.svg" className="h-8" />
                  <a href="https://wa.me/5543999251368?text=Ol%C3%A1%2C+vim+atrav%C3%A9s+do+site+Acidentes+por+Rabiscos" className="text-3xl text-white hover:text-purple-400">43 9 9925-1368</a>
                </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl text-wait">Instagram:</p>
                <div className="flex items-center space-x-1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" className="h-8" /> 
                  <a href="https://www.instagram.com/acidentesporrabiscos/" className="text-3xl text-white hover:text-purple-400">@acidentesporrabiscos</a>
                </div>
                <div className="flex items-center space-x-1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" className="h-8" />
                  <a href="https://www.instagram.com/joaopnunesilva/" className="text-3xl text-white hover:text-purple-400">@joaopnunesilva</a>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl text-wait">E-mail:</p>
                <div className="flex items-center space-x-1">
                  <img src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png" className="h-9" />
                <p className="text-3xl text-wait">joaopedronunesdasilva2@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
