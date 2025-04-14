function TableHeader() {
  return (
    <div className="flex flex-row items-center p-[12px_24px] gap-2 w-full h-[56px] bg-[#FAFAFA] rounded-[8px] flex-none order-0 align-self-stretch flex-grow-0 z-0">
           {" "}
      <div className="flex flex-row items-center p-0 gap-2 w-[91.2px] h-[16px] flex-none order-0 flex-grow-0">
               {" "}
        <span className="w-[91.2px] h-[16px] font-roboto font-medium text-[14px] leading-[16px] text-[#5A6472] opacity-90 flex-none order-0 flex-grow-0">
                    Request ID       {" "}
        </span>
             {" "}
      </div>
           {" "}
      <div className="flex flex-row items-center p-0 gap-2 w-[300px] h-[16px] flex-none order-1 flex-grow-0">
               {" "}
        <span className="w-[208px] h-[16px] font-roboto font-medium text-[14px] leading-[16px] text-[#394555] flex-none order-0 flex-grow-0 opacity-90">
                    Request Title       {" "}
        </span>
             {" "}
      </div>
           {" "}
      <div className="flex flex-row items-center p-0 gap-2 w-[140.2px] h-[16px] flex-none order-2 flex-grow-0">
               {" "}
        <span className="w-[73px] h-[16px] font-roboto font-medium text-[14px] leading-[16px] text-[#5A6472] opacity-90 flex-none order-0 flex-grow-0">
                    Certificates       {" "}
        </span>
             {" "}
      </div>
           {" "}
      <div className="flex flex-row items-center p-0 gap-2 w-[270.53px] h-[16px] flex-none order-3 flex-grow-0">
               {" "}
        <span className="w-[57px] h-[16px] font-roboto font-medium text-[14px] leading-[16px] text-[#5A6472] opacity-90 flex-none order-0 flex-grow-0">
                    Category       {" "}
        </span>
             {" "}
      </div>
           {" "}
      <div className="flex flex-row items-center p-0 gap-2 w-[212.53px] h-[16px] flex-none order-4 flex-grow-0">
               {" "}
        <span className="w-[37px] h-[16px] font-roboto font-medium text-[14px] leading-[16px] text-[#5A6472] opacity-90 flex-none order-0 flex-grow-0">
                    Dated       {" "}
        </span>
             {" "}
      </div>
           {" "}
      <div className="flex flex-row items-center p-0 gap-2 w-[148.53px] h-[16px] flex-none order-5 flex-grow-1">
               {" "}
        <span className="w-[41px] h-[16px] font-roboto font-medium text-[14px] leading-[16px] text-[#5A6472] opacity-90 flex-none order-0 flex-grow-0">
                    Status       {" "}
        </span>
             {" "}
      </div>
           {" "}
      <div className="flex flex-row justify-center items-center p-0 gap-2 w-[104px] h-[16px] flex-none order-6 flex-grow-0">
               {" "}
        <span className="w-[41px] h-[16px] font-roboto font-medium text-[14px] leading-[16px] text-[#5A6472] opacity-90 flex-none order-0 flex-grow-0">
                    Action       {" "}
        </span>
             {" "}
      </div>
         {" "}
    </div>
  );
}
export default TableHeader;
