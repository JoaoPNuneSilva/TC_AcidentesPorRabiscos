import { Header } from "../../components/Header";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useComicHook from "@/hooks/useComicHook";


export const HqView = (): JSX.Element => {

    //@ts-ignore
    const [ratingHq, setRatingHq] = useState<number | null>(0);
    const [indexPhoto, setIndexPhoto] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [hqs, setHqs] = useState<any>([]);
    //@ts-ignore
    const [totalPages, setTotalPages] = useState<number>(0);

    const { comicControllerComicRead } = useComicHook();

    useEffect(() => {
        findAll()
    }, []);

    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    console.log(id)

    const findAll = async () => {
    //@ts-ignore
        const response = await comicControllerComicRead(id, 1);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            setHqs(response.data);

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

    const hq =
    {
        id: 123,
        nome: "Wolverine",
        descricao: "",
        photos: [
            'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952116/pw_-_01_pag_-_00.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952117/pw_-_01_pag_-_00b.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952119/pw_-_01_pag_-_01.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952120/pw_-_01_pag_-_02.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952122/pw_-_01_pag_-_04.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952123/pw_-_01_pag_-_05.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952126/pw_-_01_pag_-_08.jpg', 'https://static.hq-now.com/hqs/hqs/uploads/picture/image/952127/pw_-_01_pag_-_09.jpg'
        ]
    }

    const handleChangePage = (newIndex: number) => {
        setIndexPhoto(newIndex);
    };

    const handlePreviousPage = async () => {
        if (indexPhoto > 0) {
            setIndexPhoto(indexPhoto - 1);
    //@ts-ignore
            const response = await comicControllerComicRead(id, page - 1);
            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
                setHqs(response.data);
                setPage(page - 1);

            }
        } else {

            return
        }
    };

    const handleNextPage = async () => {
        if (indexPhoto < hq.photos.length - 1) {
            setIndexPhoto(indexPhoto + 1);
    //@ts-ignore
            const response = await comicControllerComicRead(id, page + 1);
            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
                setHqs(response.data);
                setPage(page + 1);

            }
        } else {
            return
        }
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 1; // Número máximo de páginas visíveis antes de mostrar "..."
        const totalPages = hqs.totalPages;

        let startPage = Math.max(0, indexPhoto - maxVisiblePages);
        let endPage = Math.min(totalPages - 1, indexPhoto + maxVisiblePages);

        if (startPage > 0) {
            pages.push(1); // Adiciona a página 1
            if (startPage > 1) {
                pages.push("..."); // Adiciona "..." se houver páginas ocultas antes da primeira página visível
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i + 1);
        }

        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                pages.push("..."); // Adiciona "..." se houver páginas ocultas após a última página visível
            }
            pages.push(totalPages); // Adiciona a última página
        }

        return pages;
    };



    return (
        <div className="w-full  min-h-[100vh] relative">
            <img src="/fundo.png" className="w-full h-[100vh] object-cover fixed  -z-10" alt="" />
            <Header />
            <div className="comic-neue-regular flex flex-col justify-between mt-12 md:mt-4 items-center text-white px-8 ">
                <h1 className="text-4xl uppercase">{hqs.comicTitle}</h1>
                <div className=" flex justify-center md:w-[500px]">


                    <img src={hqs.pagePhoto} className='h-full w-full object-cover' alt="" />

                </div>
                <div className="flex gap-8">
                    <button onClick={handlePreviousPage} disabled={indexPhoto === 0} className={`${indexPhoto === 0 ? 'opacity-20' : ''}`}><FaChevronLeft /></button>
                    <div className="flex flex-row gap-2">
                        {generatePageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => handleChangePage(typeof page === "number" ? page - 1 : indexPhoto)}
                                className={typeof page === "number" && page - 1 === indexPhoto ? 'text-purple-400' : ''}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNextPage} disabled={indexPhoto === hq.photos.length - 1} className={`${indexPhoto === hq.photos.length - 1 ? 'opacity-20' : ''}`}><FaChevronRight /></button>
                </div>
                <Rating
                    className="border-white mt-8"
                    name="size-large"
                    size="large"
                    value={hqs.totalPages}
                    emptyIcon={<StarIcon style={{ opacity: 0.40, color: 'white' }} fontSize="inherit" />}
                    //@ts-ignore
                    onChange={(event, newValue) => {
                        setRatingHq(newValue);
                    }} />

            </div>
            <div className="text-white px-8 mt-20 flex flex-col comic-neue-regular">

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
