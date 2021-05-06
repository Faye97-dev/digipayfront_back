import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getParticipantsCagnote } from "../../actions/async";
import { showAlert } from "../../utils/alerts";

export default function ListParticipants(props) {
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    setLoading(true);
    getParticipantsCagnote(props.cagnote, showAlert, props.access).then(
      (res) => {
        if (res) {
          setParticipants(res);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    );
  }, []);
  return (
    <>
      {loading ? (
        <div className="p-3">
          <SyncLoader color={"var(--primary)"} loading={true} />
        </div>
      ) : (
        <>
          {participants.length === 0 ? (
            <span className="p-3">Pas de participants !</span>
          ) : (
            <div className="px-1 py-1">
              <div className="scroll-area rounded bg-white shadow-overflow">
                <PerfectScrollbar>
                  <div className="p-3">
                    {participants.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="d-flex justify-content-between flex-wrap">
                            <div className="py-1 pr-1 ">
                              <div className="font-size-md font-weight-bold">
                                <a
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}
                                  className="text-black"
                                >
                                  {`${item.participant.first_name} ${item.participant.last_name}`}
                                </a>
                              </div>
                            </div>

                            <div className="py-1 pr-1">
                              <span className="font-weight-bold text-primary font-size-lg">
                                {item.montant}
                              </span>
                              <small className="pl-2 text-black">MRU</small>
                            </div>

                            <div className="py-1 ">
                              <span className="font-weight-normal text-primary font-size-md">
                                {item.date}
                              </span>
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                        </div>
                      );
                    })}
                  </div>
                </PerfectScrollbar>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
