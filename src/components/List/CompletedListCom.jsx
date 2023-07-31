
// eslint-disable-next-line react/prop-types
export const CompletedListCom = ({tittle}) => {
  return (
    <div className="bg-inColor hover:bg-cnColor text-white hover:text-black p-1 h-36 w-36 flex flex-col relative">
        <p className="text-inherit text-2xl font-bold">{tittle}</p>
        <p className="text-inherit text-center absolute bottom-2">Completed!</p>
    </div>
  )
}
