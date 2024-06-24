import { useState } from "react";
import { Header } from "../../components/Header";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AiFillPicture } from "react-icons/ai";
import { UploadButton } from "react-uploader";
import { FaBookMedical, FaImage } from "react-icons/fa";
import { Uploader } from "uploader";
import useComicHook from "@/hooks/useComicHook";
import { ComicCreateDto } from "@/services/api-back";
import { useNavigate } from "react-router-dom";

interface Image {
  id: string;
  src: string;
}

export const UploadComic = (): JSX.Element => {
  const [images, setImages] = useState<Image[]>([]);
  const [profileImage, setProfileImage] = useState("");
  const [wallpaperImage, setWallpaperImage] = useState("");
  const [title, setTitle] = useState("");
  const [sinopse, setSinopse] = useState("");

  const navigate = useNavigate() ;

  const uploader = Uploader({
    apiKey: "free",
  });

  const options = {
    multi: true,
    mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
  };
    //@ts-ignore
  const handleDrop = (files) => {
    console.log('files', files);
    const fileList = files;
    if (!fileList) return;

    setCoverImage(files);
    console.log('oi', files);
    //@ts-ignore
    const newImages = fileList.map((file, index) => ({
      id: index,
      src: file.fileUrl, // Ajuste para corresponder ao campo correto no seu objeto de arquivo
    }));

    setImages([...images, ...newImages]);
    console.log([...images, ...newImages])
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setImages(reorderedImages);
  };

  const handleDelete = (id: string) => {
    const filteredImages = images.filter(image => image.id !== id);
    setImages(filteredImages);
  };

  const { comicControllerCreate } = useComicHook();

  const handleCreateComic = async () => {
    console.log('profileImage', profileImage);
    console.log('wallpaperImage', wallpaperImage);
    console.log('images', images);
    console.log('title', title);  
    console.log('sinopse', sinopse);  


    if (!profileImage || !wallpaperImage || images.length === 0 || !title || !sinopse) {
      alert("Preencha todos os campos para criar o quadrinho!");
      return;
    }
  
    const comic: ComicCreateDto = {
      title: title,
      sinopse: sinopse,
      coverPhoto: profileImage,
      bannerPhoto: wallpaperImage,
      pages: images.map((image, index) => ({
        pagePhoto: image.src,
        pageNumber: index + 1
      }))
    };
  
    console.log('comic', comic);
    // Descomente a linha abaixo quando estiver pronto para enviar os dados
    const response = await comicControllerCreate(comic);
    console.log(response);
    if (response.status === 201) {
      alert("Quadrinho criado com sucesso!");
      navigate("/home")
    }
  }

  // armazena o estado da capa do quadrinho
  //@ts-ignore
  const [coverImage, setCoverImage] = useState<string | null>(null);

  return (
    <div className="w-full min-h-[100vh] relative">
      <img src="/fundo.png" className="w-full min-h-[100vh] object-cover fixed -z-10" alt="Background" />
      <Header />
      <div className="comic-neue-regular w-full flex flex-col items-center justify-center lg:px-40 px-1">
        <div className="bg-black/70 flex flex-col rounded-xl justify-center items-center mt-20 mb-20 py-8 w-full h-full">
          <div className="flex flex-col w-full px-4">
            <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Nome do Quadrinho:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="outline-none focus:border-purple-400 focus:border-2 px-2 rounded-xl h-10" />
          </div>
          <br />
          <div className="flex flex-col w-full px-4">
            <label htmlFor="" className="text-purple-400 comic-neueregular text-xl ml-2">Sinopse:</label>
            <input type="text" value={sinopse} onChange={(e) => setSinopse(e.target.value)} className="outline-none focus:border-purple-400 focus:border-2 px-2 rounded-xl h-20" />
          </div>
          <br />
          <div className="lg:px-14 px-2 grid grid-cols-1 lg:grid-cols-3 w-full lg:h-80 h-full mb-12 lg:mb-0 gap-12">
            <div className="h-60 col-span-1 flex flex-col items-center">
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) => setProfileImage(files[0]?.fileUrl || "")}
              >
                {({ onClick }) => (
                  <>
                    <button onClick={onClick} className="bg-[#180037] text-white hover:bg-[#180037]/90 flex rounded-xl p-2 gap-2 items-center justify-center">
                      Adicionar Capa do Quadrinho
                    </button>
                  </>
                )}
              </UploadButton>
              <div className=" h-full w-40 lg:w-full border-dashed border border-white z-10 relative rounded-xl mt-4">
                {profileImage ? (
                  <img src={profileImage} className="w-full h-full object-cover rounded-xl" alt="" />
                ) : (
                  <div className="absolute w-full h-full bg-purple-400/40 flex justify-center text-center items-center text-7xl rounded-xl">
                    <FaBookMedical className="text-purple-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="h-60 lg:col-span-2 col-span-1 flex flex-col items-center ">
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) => setWallpaperImage(files[0]?.fileUrl || "")}
              >
                {({ onClick }) => (
                  <>
                    <button onClick={onClick} className="bg-[#180037] text-white hover:bg-[#180037]/90 flex rounded-xl  p-2 gap-2 items-center justify-center">
                      Adicionar Papel de Parede
                    </button>
                  </>
                )}
              </UploadButton>
              <div className="h-full w-full border-dashed border border-white z-10 relative rounded-xl mt-4">
                {wallpaperImage ? (
                  <img src={wallpaperImage} className="w-full h-full object-cover rounded-xl" alt="" />
                ) : (
                  <div className="absolute w-full h-full bg-purple-400/40 flex justify-center text-center items-center text-7xl rounded-xl">
                    <FaImage className="text-purple-400" />
                  </div>
                )}
              </div>
            </div>

          </div>

          <br />
          <div className="w-full xl:px-14 px-2 h-full">

            <section className="bg-gray-900 p-3 rounded-xl w-full flex flex-col items-center">
              <div className="mt-4">

                <UploadButton
                  uploader={uploader}
                  options={options}
                  onComplete={(files) => handleDrop(files)}
                >
                  {({ onClick }) => (
                    <>
                      <button onClick={onClick} className="bg-[#180037] text-purple-400 hover:bg-[#180037]/90 flex rounded-xl flex-row gap-2">
                        <div className="bg-[#180037] text-white hover:bg-[#180037]/90 flex rounded-xl  p-2 items-center cursor-pointer">

                          <AiFillPicture className="inline mr-2" />
                          Adicionar Páginas
                        </div>
                      </button>
                    </>
                  )}
                </UploadButton>
                <br />
                <br />
              </div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images" direction="horizontal" type="GRID">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {images.map((image, index) => (
                        <Draggable key={image.id} draggableId={image.id} index={index} >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="relative "


                            >
                              <img src={image.src} alt={`Image ${index + 1}`} className="col-span-1 w-40 h-52  object-contain rounded-lg hover:opacity-70 border border-white" />
                              <span className="absolute top-0 left-0 bg-[#180037] bg-opacity-90 px-1 text-xs text-white rounded-tl-lg">
                                Pág {index + 1 < 10 ? `0${index + 1}` : index + 1}
                              </span>
                              <button onClick={() => handleDelete(image.id)} className="absolute top-0 right-0 bg-red-500 bg-opacity-90 px-1 text-xs text-white rounded-tr-lg">
                                X
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div className="mt-4">
                {images.length > 0 && (

                  <button onClick={() => handleCreateComic()} className="bg-[#180037] text-purple-400 hover:bg-[#180037]/90 flex rounded-xl flex-row gap-2">
                    <div className="bg-[#180037] text-white hover:bg-[#180037]/90 flex rounded-xl  p-2 items-center cursor-pointer">


                      Criar quadrinho
                    </div>
                  </button>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};
