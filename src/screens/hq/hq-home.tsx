import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import useComicHook from "@/hooks/useComicHook";
import { convertIsoToDate } from "@/utils/formatDate";


export const HqHome = (): JSX.Element => {

  const [hq, setHq] = useState<any>([]);

  const { comicControllerComicHome } = useComicHook();

  useEffect(() => {
    findAll()
  }, []);

  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  console.log(id)

  const findAll = async () => {
    //@ts-ignore
    const response = await comicControllerComicHome(id);
    console.log(response);
    if (response.status === 200) {
      console.log(response.data);
      setHq(response.data);
    }
  }
  const users = [
    {
      id: 1,
      nome: "Usuário comum",
      photo: "/jeff-1.png",
      descricao: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed"
    },
    {
      id: 2,
      nome: "Usuário avançado",
      photo: "/jeff-1.png",
      descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
      id: 3,
      nome: "Usuário premium",
      photo: "/jeff-1.png",
      descricao: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
    }
  ];
  const [ratingHq, setRatingHq] = useState<number | null>(4);
  return (
    <div className="w-full  min-h-[100vh] relative">
      <img src="/fundo.png" className="w-full h-[100vh] object-cover fixed -z-10" alt="" />
      <Header />
      <div className="h-60 w-full bg-black/50 relative">
        <img src={hq.bannerPhoto} alt="" className="absolute -z-10 w-full h-full object-cover" />
      </div>
      <div className="comic-neue-regular flex md:flex-row flex-col justify-between items-center text-white md:px-8 px-2 mt-4">
        <div className=" flex justify-center  h-[360] w-[300px] bg-red-500">
          <img src={hq.coverPhoto} className='h-full w-full object-cover' alt="" />
        </div>
        <div className=" flex flex-col gap-4 md:px-4 w-full">
          <h1 className="md:text-4xl text-2xl text-center md:text-start uppercase">{hq.title}</h1>
          <p className="text-lg opacity-90">{hq.sinopse}</p>
          <div className="flex items-center gap-4">
            <h1 className="md:text-3xl">Data de lançamento:</h1>
            <p className="md:text-3xl opacity-80">{convertIsoToDate(hq.createdAt)}</p>
          </div>
          <div className="flex flex-row items-center gap-8">
            <Link to={`/hq/view?id=${hq.id}`} className="bg-[#180037] text-white md:text-3xl px-4 py-2 rounded-lg hover:opacity-90 comic-neue-regular">Ler agora!</Link>
            {/* <Rating

              name="simple-controlled"
              value={ratingHq}
              @ts-ignore
              onChange={(event, newValue) => {
                //@ts-ignore
                createRating('Gosta de viajar:', newValue);
                //@ts-ignore
                setRatingHq(newValue);
              }}
            /> */}
            <Rating
              className="border-white"
              name="size-large"
              size="large"
              value={ratingHq}
              readOnly
              emptyIcon={<StarIcon style={{ opacity: 0.40, color: 'white' }} fontSize="inherit" />}
              // @ts-ignore
              onChange={(event, newValue) => {
                setRatingHq(newValue);
              }} />
          </div>


        </div>
      </div>
      <div className="text-white md:px-8 px-2 mt-20 flex flex-col comic-neue-regular">

        <h1 className="text-4xl uppercase">Comentários:</h1>

        <div className="flex flex-col gap-4 mt-4 mb-20">


          <div className="flex flex-row items-start gap-4">
            <div className="flex flex-col">
              <img src="/jeff-1.png" alt="" className="h-10 w-10 object-cover rounded-full bg-purple-400" />
              <p className="text-lg">Você</p>
            </div>
            <textarea placeholder="Digite um comentário" className="resize-none outline-none focus:border-purple-400 focus:border-2 px-2 w-full  rounded-xl md:h-32 h-20" />
          </div>
          <div className="w-full flex justify-end">

            <button className="w-60 h-10 bg-[#180037] text-white text-xl whitespace-nowrap px-4 py-2 rounded-lg hover:opacity-90 comic-neue-regular">
              Enviar comentário!
            </button>
          </div>
          {users.map((user) => (
            <div className="flex flex-row gap-4 mt-4 items-start" key={user.id}>
              <img src={user.photo} alt="" className="h-10 mt-2 min-w-10 object-cover rounded-full bg-purple-400" />
              <div className="flex flex-col">
                <p className="text-lg text-cyan-500">{user.nome}</p>
                <p>{user.descricao}</p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};
