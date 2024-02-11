// import { useEffect, useState, useRef } from "react";
// import classes from "./ItemShopCard.module.css";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Dialog,
//   DialogContent,
//   DialogClose,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { ProfileDogamType } from "@/types/dogamTypes";
// import useUserStore from "@/store/user/userStore";
// // import { useProfileDogamQuery } from "@/hooks/profile/queries/useProfileDogamQuery";
// // import InfiniteScroll from "react-infinite-scroller";
// import { useDeleteCollectionDelete } from "@/hooks/itemshop/mutations/useDeleteCollectionDelete";
// import { useNavigate } from "react-router-dom";
// export default function TitleItemshop({
//   itemName,
//   itemPrice,
//   myPoint,
// }: {
//   itemName: string;
//   itemPrice: number;
//   myPoint: number;
// }) {
//   const { userInfo } = useUserStore();
//   const mutation = useDeleteCollectionDelete();
//   const { mutate } = mutation;
//   const navigate = useNavigate();

//   // Item Card CSS 세팅
//   const containerRef = useRef<HTMLDivElement>(null);
//   const overlayRef = useRef<HTMLDivElement>(null);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (containerRef.current && overlayRef.current) {
//       const x = e.nativeEvent.offsetX;
//       const y = e.nativeEvent.offsetY;
//       const rotateY = (-1 / 5) * x + 20;
//       const rotateX = (4 / 30) * y - 20;

//       overlayRef.current.style.filter = "opacity(10)";
//       overlayRef.current.style.backgroundPosition = ` ${160 - x}% ${250 - y}%`;

//       containerRef.current.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//     }
//   };

//   const handleMouseOut = () => {
//     if (overlayRef.current && containerRef.current) {
//       overlayRef.current.style.filter = "opacity(0)";
//       containerRef.current.style.transform =
//         "perspective(350px) rotateY(0deg) rotateX(0deg)";
//     }
//   };

//   return (
//     <Card className="border-0">
//       <Dialog>
//         <DialogTrigger asChild>
//           <div
//             className={`${classes.itemElemContainer}`}
//             ref={containerRef}
//             onMouseMove={handleMouseMove}
//             onMouseOut={handleMouseOut}
//           >
//             <div
//               className={`${classes.itemElemOverlay}`}
//               ref={overlayRef}
//             ></div>
//             <div className={`${classes.itemElemCard}`}>
//               <h1 className={`${classes.itemElemContent}`}>도감삭제권</h1>
//             </div>
//           </div>
//         </DialogTrigger>

//         {/* 모달 부분 */}
//         <DialogContent className="sm:max-w-[480px]">
//           <DialogHeader>
//             <DialogTitle className="flex flex-col items-center text-3xl">
//               <div className="mb-3">{itemName}</div>

//               <div className="rounded-xl h-[4rem] w-[15rem] grid place-items-center bg-white">
//                 <div className="flex flex-row justify-content-center gap-4">
//                   <img src="/image/coins.png" className="h-10 w-10" />
//                   <span className="self-center text-2xl font-bold">
//                     {itemPrice}
//                   </span>
//                 </div>
//               </div>
//             </DialogTitle>
//           </DialogHeader>

//           {/* 본문 */}
//           <div className="flex justify-center w-full" />
//           <div className="font-bold text-center">
//             <div className="overflow-y-auto scrollbar-hide flex-now"></div>
//             구입 후 잔여 포인트 {myPoint - itemPrice} P
//           </div>
//           <DialogFooter className="flex sm:justify-center">
//             {/* 취소 버튼 */}
//             <DialogClose asChild>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="mr-10 border-solid border-2 border-inherit bg-white font-bold h-8 text-lg"
//               >
//                 취소
//               </Button>
//             </DialogClose>

//             {/* 구매 버튼 */}
//             <Button
//               type="button"
//               variant="secondary"
//               className="mr-10 border-solid border-2 border-inherit bg-white font-bold h-8 text-lg"
//               onClick={() => {
//                 navigate(`/main/profile/:${userInfo.userId}/dishonor`);
//               }}
//             >
//               구입
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// }
