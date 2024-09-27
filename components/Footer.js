import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-20 px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0">
          {/* <h2 className="text-xl font-bold">Reflectra.ai</h2> */}
          <Image
          src="/logo.png"  
          alt="Logo"
          width={150}     
          height={60}     
          priority />
          <p className="text-sm">Improving AI reasoning and reflection.</p>
        </div>
        
        <div className="flex gap-4">
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6 fill-current hover:text-blue-400" viewBox="0 0 24 24">
              {/* Twitter SVG */}
              <path d="M22.46 6c-.77.35-1.5.6-2.33.7.83-.5 1.5-1.33 1.82-2.3-.78.47-1.65.81-2.57 1-2.35-2.5-6.4-1.6-7.67 1.6-.63 1.3-.3 2.9.8 3.7-.7 0-1.4-.2-2-.5v.1c0 1.5 1.1 2.7 2.5 3-.6.2-1.2.2-1.8.1.5 1.5 1.8 2.5 3.4 2.5-1.3 1-3.1 1.5-4.8 1.5h-.9c1.7 1 3.8 1.5 5.8 1.5 7.5 0 11.6-6.3 11.6-11.6v-.5c.8-.5 1.5-1.2 2-2z"/>
            </svg>
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6 fill-current hover:text-blue-400" viewBox="0 0 24 24">
              {/* Facebook SVG */}
              <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.2 8.5 9.9v-7h-2.5v-2.9h2.5V9.7c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.8h2.7l-.4 2.9h-2.3v7C18.3 21.2 22 17 22 12z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom section: Copyright */}
      <div className="text-center mt-4 text-xs text-gray-500">
        <p>© 2024 Reflectra.ai. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
