import { useAppDispatch } from "@/redux/hooks";
import { addServiceToCart } from "@/redux/slices/serviceSlice";
import { IService } from "@/types";
import { Button, Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoRemoveCircle } from "react-icons/io5";

interface ICartCard {
  item: IService;
}

const CartCard = ({ item }: ICartCard) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemoveItem = () => {
    dispatch(addServiceToCart(item));
  };

  return (
    <div className="w-full h-full bg-white p-2 rounded grid gap-5 grid-cols-3 lg:grid-cols-6 items-center shadow">
      <Image
        src={item?.image}
        width={55}
        height={55}
        className="h-[55px] w-[55px] object-cover rounded"
        alt="card service image"
        layout="responsive"
      />

      <h2>{item.name}</h2>
      <p className="font-semibold">${item.price}</p>
      <p className="text-green-400 text-xs md:text-base">
        Status: <span className="text-xs md:text-base">{item.status}</span>
      </p>

      <div onClick={handleRemoveItem}>
        <Tooltip title="Remove from cart" color="#ff3333">
          <IoRemoveCircle className="text-[#ff3333]" />
        </Tooltip>
      </div>

      <Button
        onClick={() => router.push(`/service-details/${item?.id}`)}
        type="primary"
        size="small"
      >
        Details
      </Button>
    </div>
  );
};

export default CartCard;
