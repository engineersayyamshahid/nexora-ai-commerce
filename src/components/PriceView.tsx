import React from "react";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  previousPrice?: number | undefined;
  className?: string;
}

const PriceView = ({ price, previousPrice, className }: Props) => {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <PriceFormatter amount={price} className="text-shop_dark_green font-bold text-lg" />
      {previousPrice && previousPrice > (price ?? 0) && (
        <PriceFormatter 
          amount={previousPrice} 
          className="line-through font-normal text-gray-400 text-sm" 
        />
      )}
    </div>
  );
};

export default PriceView;


// import React from "react";
// import PriceFormatter from "./PriceFormatter";

// interface Props {
//   price: number | undefined;
//   discount: number | undefined;
//   className?: string;
// }

// const PriceView = ({ price, discount, className }: Props) => {
//   return (
    
//       <div className="flex items-center gap-2">
//         <PriceFormatter amount={price} className="text-shop_dark_green" />
//         {price && discount && (
//           <PriceFormatter amount={price + (discount * price) / 100} className="line-through font-normal text-shop_lighter_text" />
//         )}
//       </div>
    
//   );
// };

// export default PriceView;