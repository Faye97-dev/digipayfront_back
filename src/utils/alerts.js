import { toast } from "react-toastify";
export const showAlert = (type, text, icon) => {
  const msg = (title) => (
    <div className={`d-flex align-items-center align-content-start`}>
      <span
        className={`font-size-xl d-block d-40 btn-icon mr-3 text-center bg-white text-${type} rounded-sm`}
      >
        {icon}
      </span>
      <span className="text-justify">
        <strong className={`d-block`}>{title + " !"}</strong>
        {text}
      </span>
    </div>
  );

  //switch (type) {
  if (type === "info") {
    //console.log(text);
    toast.info(msg("Info"), {
      containerId: "B",
    });
  } else if (type === "warning") {
    toast.warning(msg("Attention"), {
      containerId: "B",
    });
  } else if (type === "danger") {
    toast.error(msg("Erreur"), {
      containerId: "B",
    });
  } else if (type === "success") {
    toast.success(msg("Success"), {
      containerId: "B",
    });
  }
  //}
};
