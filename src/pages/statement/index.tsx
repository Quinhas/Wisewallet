/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import StatementListItem from "components/StatementListItem";

export default function Statement() {
  return (
    <>
      <StatementListItem variant="income" value={1527} account={'Nubank'} title={'DSIN Tecnologia da Informação'} />
      <StatementListItem variant="expense" value={13.34} account={'Nubank'} category={'Transporte'} title={'99app'} />
      <StatementListItem variant="transfer" value={15} origin={'Nubank'} destination={'PicPay'} />
    </>
  )
}
