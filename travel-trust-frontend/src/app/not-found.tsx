import Image from "next/image";
import notFoundImage from "@/assets/404.png";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen">
      <h3 className="text-xl font-bold ">
        Opps! Page not found <Link href={"/"}>Go Home</Link>
      </h3>
      <Image
        src={notFoundImage}
        objectFit="cover"
        width={280}
        alt="not found image"
      />
    </div>
  );
};

export default NotFound;
