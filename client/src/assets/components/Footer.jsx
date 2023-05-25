export default function Footer({haveAcount}){
  return (
    <div className="w-[100%] mt-5 flex justify-center border-t-[.7px] border-white/30 text-[.5em] font-inter text-sky-400 py-1">
      <a href={haveAcount ? "/login" : "/register"}><p>{haveAcount ? "sudah punya akun?silahkan login" : "belum punya akun?silahkan register terlebih dahulu"}</p></a>
    </div>
    )
}