import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "reactstrap";
import CountUp from "react-countup";
import { getProfilStatistiques } from "../../actions/withoutRedux/statistique";
import { connect } from "react-redux";
import { SkeletonProfilStatistique } from "../../utils/SkeletonLoader";
const statistiqueMapper = {
  payements_recus: { title: "Paiements reçus", color: "primary" },
  payements: { title: "Paiements", color: "primary" },
  payements_faits: { title: "Paiements faits", color: "warning" },
  remboursements_recus: { title: "Remboursements reçus", color: "info" },
  remboursements: { title: "Remboursements", color: "info" },
  remboursements_faits: { title: "Remboursements faits", color: "danger" },
  recharges: { title: "Recharges", color: "success" },
  retraits: { title: "Retraits", color: "warning" },
  transferts: { title: "Transferts", color: "primary" },
  envoies_recus: { title: "Transferts reçus", color: "primary" },
  envoies_faits: { title: "Transferts envoyés", color: "warning" },
  retraits_par_sms: { title: "Retraits par Sms", color: "warning" },
  compensations_versement: {
    title: "Compensations versements",
    color: "primary",
  },
  compensations_retraits: { title: "Compensations retraits", color: "warning" },
  compensations_en_attente: {
    title: "Compensations en attente",
    color: "info",
  },
  compensations_annules: { title: "Compensations annulées", color: "danger" },
};
function ProfilStatistique(props) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    //setTimeout(() => {
    getProfilStatistiques(props.user.id, props.access).then((res) => {
      if (res) {
        setStats(res);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    //}, 15000);
  }, []);
  const keyStats = stats ? Object.keys({ ...stats }) : [];
  const halfSize = stats ? keyStats.length / 2 : 0;
  return (
    <Card className="card-box mb-2">
      <Row className="no-gutters">
        {loading ? (
          <>
            <Col xl="6">
              <div className="divider-v divider-v-lg" />
              <SkeletonProfilStatistique />
            </Col>
            <Col xl="6">
              <div className="divider-v divider-v-lg" />
              <SkeletonProfilStatistique />
            </Col>
          </>
        ) : (
          <>
            <Col xl="6" className="p-4">
              <div className="divider-v divider-v-lg" />
              {keyStats.slice(0, halfSize).map((item, index, arr) => {
                return (
                  <div key={index}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <b>{statistiqueMapper[item]?.title}</b>
                        {/*<div className="text-black-50">
                        Paiements du mois précédent
                        </div>*/}
                      </div>
                      <div
                        className={`font-weight-bold text-${statistiqueMapper[item]?.color} font-size-xl`}
                      >
                        <CountUp
                          start={0}
                          end={stats[item]}
                          duration={3}
                          delay={0}
                          suffix=" MRU"
                        />
                      </div>
                    </div>
                    {arr.length - 1 !== index && (
                      <div className="divider my-3" />
                    )}
                  </div>
                );
              })}
            </Col>
            <Col xl="6" className="p-4">
              <div className="divider-v divider-v-lg" />
              {keyStats
                .slice(halfSize, keyStats.length)
                .map((item, index, arr) => {
                  return (
                    <div key={index}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <b>{statistiqueMapper[item]?.title}</b>
                        </div>
                        <div
                          className={`font-weight-bold text-${statistiqueMapper[item]?.color} font-size-xl`}
                        >
                          <CountUp
                            start={0}
                            end={stats[item]}
                            duration={3}
                            delay={0}
                            suffix=" MRU"
                          />
                        </div>
                      </div>
                      {arr.length - 1 !== index && (
                        <div className="divider my-3" />
                      )}
                    </div>
                  );
                })}
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});
export default connect(mapStateToProps, {})(ProfilStatistique);
