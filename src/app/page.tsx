import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen dark text-foreground bg-background flex items-center justify-center">
      <div className="grid-rows-1 grid-cols-1 ">
        <p className="box-border w-[500px] pb-5">Hello! Welcome to this project, where you can send information to a Ragchat AI through website links and start asking questions.</p>
          <div className="flex w-full items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
              <span className="text-black text-lg font-semibold leading-8 px-8 py-3">How it works</span>
              <div className="flex-1 border-b border-gray-300"></div>
            </div>
            <p className="box-border w-[500px] pb-5">Enter a valid URL at the end of this website's link to get started!</p>
            <div className="flex w-full items-center rounded-full">
              <div className="flex-1 border-b border-gray-300"></div>
              <span className="text-black text-lg font-semibold leading-8 px-8 py-3">Quick Example</span>
              <div className="flex-1 border-b border-gray-300"></div>
            </div>
            <p className="box-border w-[500px]">localhost:3000/https://lotr.fandom.com/wiki/Aragorn_II</p>
        </div>
    </main>
  );
}
