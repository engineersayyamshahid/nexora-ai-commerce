"use client";

import React from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import useDictionary from "@/hooks/useDictionary";

interface ContactItemData {
  key: string;
  defaultTitle: string;
  subtitle: string;
  icon: React.ReactNode;
}

const FooterTop = () => {
  const dict = useDictionary();
  const footerDict = dict?.footer as Record<string, string> | undefined;

  const data: ContactItemData[] = [
    {
      key: "visitUs",
      defaultTitle: "Visit Us",
      subtitle: "Islamabad, Pakistan",
      icon: <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />,
    },
    {
      key: "callUs",
      defaultTitle: "Call Us",
      subtitle: "+92 3470542300",
      icon: <Phone className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />,
    },
    {
      key: "workingHours",
      defaultTitle: "Working Hours",
      subtitle: "Mon - Sat : 7:00 AM - 10:00 PM",
      icon: <Clock className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />,
    },
    {
      key: "emailUs",
      defaultTitle: "Email Us",
      subtitle: "Venzaro@gmail.com",
      icon: <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-200 dark:border-zinc-800">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3 group hover:bg-gray-50 dark:hover:bg-zinc-900/50 p-4 transition-colors rounded-lg">
          {item.icon}
          <div>
            <h3 className="font-semibold text-shop_dark_green dark:text-shop_light_green">
              {footerDict?.[item.key] || item.defaultTitle}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;


// import React from "react";
// import { Clock, Mail, MapPin, Phone } from "lucide-react";

// interface ContactItemData {
//   title: string;
//   subtitle: string;
//   icon: React.ReactNode;
// }

// const data: ContactItemData[] = [
//   {
//     title: "Visit Us",
//     subtitle: "Islamabad, Pakistan",
//     icon: (
//       <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />
//     ),
//   },
//   {
//     title: "Call Us",
//     subtitle: "+92 3470542300",
//     icon: (
//       <Phone className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />
//     ),
//   },
//   {
//     title: "Working Hours",
//     subtitle: "Mon - Sat : 7:00 AM - 10:00 PM",
//     icon: (
//       <Clock className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />
//     ),
//   },
//   {
//     title: "Email Us",
//     subtitle: "Venzaro@gmail.com",
//     icon: (
//       <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-shop_light_green transition-colors" />
//     ),
//   },
// ];

// const FooterTop = () => {
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-200 dark:border-zinc-800">
//       {data.map((item, index) => (
//         <div
//           key={index}
//           className="flex items-center gap-3 group hover:bg-gray-50 dark:hover:bg-zinc-900/50 p-4 transition-colors rounded-lg"
//         >
//           {/* Icon */}
//           {item.icon}

//           {/* Text */}
//           <div>
//             <h3 className="font-semibold text-shop_dark_green dark:text-shop_light_green">
//               {item.title}
//             </h3>

//             <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
//               {item.subtitle}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FooterTop;

// import React from "react";
// import { Clock, Mail, MapPin, Phone } from "lucide-react";

// interface ContactItemData {
//   title: string;
//   subtitle: string;
//   icon: React.ReactNode;
// }

// const data: ContactItemData[] = [
//   {
//     title: "Visit Us",
//     subtitle: "Islamabad, Pakistan",
//     icon: (
//       <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
//     ),
//   },
//   {
//     title: "Call Us",
//     subtitle: "+92 3470542300",
//     icon: (
//       <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
//     ),
//   },
//   {
//     title: "Working Hours",
//     subtitle: "Mon - Sat : 7:00 AM - 10:00 PM",
//     icon: (
//       <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
//     ),
//   },
//   {
//     title: "Email Us",
//     subtitle: "Venzaro@gmail.com",
//     icon: (
//       <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
//     ),
//   },
// ];

// const FooterTop = () => {
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
//       {data.map((item, index) => (
//         <div
//           key={index}
//           className="flex items-center gap-3 group hover:bg-gray-10 0 p-4 transition-colors"
//         >
//           {/* Icon */}
//           {item.icon}

//           {/* Text */}
//           <div>
//             <h3 className="font-semibold text-shop_dark_green">
//               {item.title}
//             </h3>

//             <p className="text-sm text-gray-600 group-hover:text-gray-900">
//               {item.subtitle}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FooterTop;