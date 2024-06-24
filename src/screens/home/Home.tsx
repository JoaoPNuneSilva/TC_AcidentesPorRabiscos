import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import useComicHook from "@/hooks/useComicHook";

export const Home = (): JSX.Element => {

  const [slidesToShow, setSlidesToShow] = useState(5);
  const [hq, setHq] = useState<any>([]);

  const { comicControllerFindAllHome } = useComicHook();

  useEffect(() => {
    findAll()
  }, []);

  const findAll = async () => {
    const response = await comicControllerFindAllHome('1', '50');
    console.log(response);
    if (response.status === 200) {
      console.log(response.data);
      //@ts-ignore
      setHq(response.data.data);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1650) {
        setSlidesToShow(5);
      } else if (window.innerWidth >= 1280) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: 'absolute', width: '20px', height: '20px', right: '12px', zIndex: '10', bottom: '0' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: 'absolute', width: '20px', height: '20px', left: '12px', zIndex: '10', bottom: '0' }}
        onClick={onClick}
      />
    );
  }


  const settingsBanner = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    useCSS: true,
    autoplay: true,
    autoplaySpeed: 5000,

  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    useCSS: true,


  };
  const dataBanner = [
    {
      name: 'Batman Gárgula de Gotham 01',
      img: 'https://img.freepik.com/vetores-gratis/modelo-de-banner-de-anime-detalhado_52683-66691.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odio voluptates, tenetur error dolore reiciendis repellendus enim pariatur consequatur quidem saepe recusandae ipsam nam adipisci harum totam excepturi accusantium sapiente?',
    },
    {
      name: 'Batman Gárgula de Gotham 02',
      img: 'https://t4.ftcdn.net/jpg/04/04/73/39/360_F_404733910_2mIXr6RbC5G3WZJFjopVsBaR3EOM6Bqy.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odio voluptates, tenetur error dolore reiciendis repellendus enim pariatur consequatur quidem saepe recusandae ipsam nam adipisci harum totam excepturi accusantium sapiente?',
    },
    {
      name: 'Velho Logan',
      img: 'https://t4.ftcdn.net/jpg/04/46/93/93/360_F_446939375_83iP0UYTg5F9vHl6icZwgrEBHXeXMVaU.jpg',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odio voluptates, tenetur error dolore reiciendis repellendus enim pariatur consequatur quidem saepe recusandae ipsam nam adipisci harum totam excepturi accusantium sapiente?',
    },
  ]


  return (
    <div className="w-full  min-h-[100vh] relative">
      <img src="/fundo.png" className="w-full h-[100vh] object-cover fixed -z-10" alt="" />
      <Header />
      <div className="h-80 w-full bg-black/90 hover:bg-black/85 relative">
        <Slider {...settingsBanner} className="w-full h-full inset-0 z-30 relative">
          {dataBanner.map((d) => (
            <div className="relative w-full bg-black/90 h-80 ">

              <img src={d.img} alt="" className="h-80 w-full object-cover absolute -z-10" />
              <div className="flex flex-col items-start px-8 py-2 justify-between  pt-0 h-full w-full gap-4 md:ml-12 mx-1 z-20">
                <h1 className="md:text-4xl text-xl text-white comic-neue-regular">{d.name}</h1>
                <div className="w-80 ">
                  <p className="md:text-lg text-sm text-white comic-neue-regular">{d.review}</p>
                </div>
                <Link to={'/hq?id=123'} className="bg-[#180037] text-white px-4 py-2 rounded-lg hover:opacity-90 comic-neue-regular">Ler agora!</Link>
              </div>

            </div>
          ))}
        </Slider>

        {/* <img src="https://i.pinimg.com/originals/a7/d2/45/a7d24524d2d02bc104ec0c0aff36dcf6.jpg" alt="" className="absolute -z-10 w-full h-full object-cover" />*/}

      </div>
      <div className="comic-neue-regular text-white px-8 mt-10">
        <h1 className="text-4xl">Destaques</h1>
      </div>

      <div className="w-full px-12 m-auto">
        <div className="mt-10">
          <Slider {...settings} className="w-full relative">
            {/* @ts-ignore */}
            {hq.map((d) => (
              <div className="h-[450px] w-8 text-black rounded-xl flex text-center" key={hq.id}>
                <div className="relative w-full h-full hover:text-white text-transparent hover:bg-gradient-to-b from-black/90 via-black/90 to-transparent flex flex-col justify-between items-center">
                  <img src={d.coverPhoto} alt="" className="h-full -z-10  w-full absolute" />
                  <p className="  p-4 ">
                    {d.sinopse}
                  </p>
                  <Link to={`/hq?id=${d.id}`} className="bg-[#180037] mb-4 w-40 text-white px-4 py-2 rounded-lg hover:bg-[#180037]/95 comic-neue-regular">Ler agora!</Link>
                </div>
                <p className="text-white mt-4 comic-neue-regular">
                  {d.title}
                </p>


                {/* <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                  <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl font-comic-neue-regular">{d.name}</p>
                <p className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">{d.review}</p>
                <button>Read More</button>
              </div> */}
              </div>


            ))}
          </Slider>
        </div>
      </div>


    </div>
  );
};

