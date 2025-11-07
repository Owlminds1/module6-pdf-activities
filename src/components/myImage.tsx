import Image from "next/image";
import { useState } from "react";

type MyImageProps = {
  path: string;
};

const MyImage = ({ path }: MyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [imgUrl,setImageUrl]=useState(path)

  return (
     <Image
        src={imgUrl}
        width={400}
        height={100}
        alt="image"
        onError={()=>setImageUrl( "/placeholder_image.jpg")}
        className={`transition-all duration-500 ease-in-out ${
          loaded ? "blur-0" : "blur-sm"
        }`}
        onLoadingComplete={() => setLoaded(true)}
      />
  );
};

export default MyImage;
