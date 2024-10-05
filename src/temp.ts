// import {
//   Pagination as PaginationUI,
//   PaginationContent,
//   PaginationLink,
//   PaginationEllipsis,
//   PaginationItem,
// } from '@/components/ui/pagination';
// import { cn } from '@/lib/utils';
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// type PaginationProps = {
//   className?: string;
//   totalPages: number;
//   currentPage: number;
//   setPage: (page: number) => void;
// };
// const getPages = (currentPage: number, totalPages: number) => {
//   const pages = [currentPage - 1, currentPage, currentPage + 1];
//   const clearPages = pages.filter((item) => item > 0 && item <= totalPages);
//   if (clearPages[0] > 1) {
//     clearPages.unshift(-1);
//   }
//   if (clearPages[clearPages.length - 1] < totalPages) {
//     clearPages.push(-1);
//   }
//   return clearPages;
// };
// export default function Pagination({
//   setPage,
//   className,
//   totalPages,
//   currentPage,
// }: PaginationProps) {
//   const pages = getPages(currentPage, totalPages);
//   return (
//     <PaginationUI className={cn('', className)}>
//       <PaginationContent>
//         <PaginationItem>
//           <div
//             className="cursor-pointer"
//             onClick={() => {
//               if (currentPage > 1) {
//                 setPage(currentPage - 1);
//               }
//             }}>
//             <ChevronLeftIcon />
//           </div>
//         </PaginationItem>
//         {pages.map((pageNum, index) => (
//           <PaginationItem key={index}>
//             {pageNum === -1 ? (
//               <PaginationEllipsis />
//             ) : (
//               <PaginationLink
//                 onClick={() => setPage(pageNum as number)}
//                 isActive={pageNum === currentPage}>
//                 {pageNum}
//               </PaginationLink>
//             )}
//           </PaginationItem>
//         ))}
//         <PaginationItem>
//           <div
//             className="cursor-pointer"
//             onClick={() => {
//               if (currentPage < totalPages) {
//                 setPage(currentPage + 1);
//               }
//             }}>
//             <ChevronRightIcon />
//           </div>
//         </PaginationItem>
//       </PaginationContent>
//     </PaginationUI>
//   );
// }
