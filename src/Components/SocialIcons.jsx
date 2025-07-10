import { Tooltip } from "primereact/tooltip";

const SocialIcons = () => {
  return (
    <div className="flex gap-8 mt-6 justify-center sm:justify-start">
      <a
        href="https://www.tiktok.com/@suray.nuez.hl?_t=ZM-8xvIglnC1Vm&_r=1"
        className="text-gray-700 hover:text-gray-800 text-lg transition-transform transform hover:scale-110"
      >
        <i className="pi pi-tiktok text-6xl"></i>
      </a>
      <a
        href="https://www.facebook.com/share/16UwLv9Rft/"
        className="text-blue-700 hover:text-blue-900 text-lg transition-transform transform hover:scale-110"
      >
        <i className="pi pi-facebook text-6xl"></i>
      </a>
      <a
        href="https://wa.me/50493367328"
        className="text-green-500 hover:text-green-700 text-lg transition-transform transform hover:scale-110"
      >
        <i className="pi pi-whatsapp text-6xl"></i>
      </a>
      <a
        href="tel:+50493367328"
        className="text-blue-500 hover:text-blue-700 text-lg transition-transform transform hover:scale-110"
      >
        <i className="pi pi-phone text-6xl"></i>
      </a>
      <a
        href="mailto:missurynunez39@gmail.com"
        className="text-red-500 hover:text-red-700 text-lg transition-transform transform hover:scale-110"
      >
        <i className="pi pi-envelope text-6xl"></i>
      </a>
    </div>
  );
};

export default SocialIcons;
