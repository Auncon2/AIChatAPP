import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-11 bg-transparent backdrop-blur-md text-white flex items-center px-6 z-50">
      {/* Left Side: Logo or Title */}
      <div className="text-lg font-semibold">My App</div>

      {/* Right Side: Profile Picture */}
      <div className="ml-auto">
        <Image
          src="/profile.jpg" // Replace with your image path
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
