import Button from "../Elements/Button";

const CardProduct = (props) => {
    const {children} = props;
    return (
      <div className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow mx-5 my-5 flex flex-col justify-between">
       {children}
      </div>
    );
};

const Header = (props) => {
    const { image } = props;
    return (
      <a href="#">
        <img
          src={image}
          alt="products"
          className="w-64 h-64 pl-20 pt-5 mb-2 mt-3 ml-5 h-48 rounded-t-lg"
        />
      </a>
    );
};

const Body = (props) => {
    const { name, children } = props; 
    return (
      <div className="pl-5 px-1 pt-5 pb-5 h-full">
        <a href="">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {name.substring(0, 20)}...
          </h3>
          <p className="lowercase text-s text-white pt-2">
            {children.substring(0, 100)}...
          </p>
        </a>
      </div>
    );
};

const Footer = (props) => {
    const { price, handleAddToCart, id } = props;
    return (
      <div className="flex items-center justify-between px-5 pb-5">
        <span className="text-xl font-bold text-white">
          ${" "}
          {price
            ? price.toLocaleString("id-ID", {
                styles: "currency",
                currency: "USD",
              })
            : 0}
        </span>
        <Button className="bg-blue-600" onClick={() => handleAddToCart(id)}>
          Add To Cart
        </Button>
      </div>
    );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;