interface AddToCartButtonProps {
  remainingStock: number;
  onClick?: () => void;
}

const AddToCartButton = ({ remainingStock, onClick }: AddToCartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-1 rounded ${
        remainingStock > 0
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={remainingStock <= 0}
    >
      {remainingStock > 0 ? "장바구니에 추가" : "품절"}
    </button>
  );
};

export default AddToCartButton;
