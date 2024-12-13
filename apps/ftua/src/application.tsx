/** @jsx h */
/** @jsxFactory h */
/** @jsxFrag Fragment */
import html, { Fragment, h } from "./vendor/htm/mod.ts";

const n2 = (val: number) => val.toFixed(2);

const n4 = (val: number) => val.toFixed(4);

const parseFloat = (val: string) => (!!val ? Number.parseFloat(val) : 0);

const LOCALE = {
  initialAmount: "Сума",
  months: "Кількість місяців",
  incr: "Базовий процент",
  maxSum: "Макс. сума в міс.",
  spare: "Початковий запас коштів",
  overpayment: "Допустима доплата в міс.",
  calculate: "Розрахувати",

  month: "Поточний міс.",
  payed: "Сплачено",
  incrShort: "Процент",
  base: "Поточна ціна",
  pay: "До оплати",
  spareShort: "Запас",
  spareIn: "В запасі",
  overpaymentShort: "Переплата",

  totalSum: "Загальна сума:",
  overPay: "Переплата:",
};

type ResultRow = {
  monthCurrent: number;
  monthTotal: number;
  xMonth: string;
  currIncr: number;
  payBase: number;
  payReal: number;
  spareChange: number;
  spare: number;
  toAdd?: number;
  theLast?: boolean;
};

const calculate = (
  initialAmount: number,
  months: number,
  incr: number,
  maxSum: number,
  spare: number,
  overpayment: number,
) => {
  const base = initialAmount / months;
  const rows: ResultRow[] = [];

  let currIncr = 1;
  let monthTotal = 0;
  let sumTotal = 0;

  for (let monthCurrent = 1; monthCurrent <= months; monthCurrent++) {
    const payBase = base * currIncr;

    let payedMon = 0;
    spare += maxSum;
    let spareChange = maxSum;

    while (spare >= payBase && monthTotal < months) {
      payedMon++;
      monthTotal++;
      spare -= payBase;
      spareChange -= payBase;
    }

    const toAddVal = payBase - spare;
    const payReal = payBase * payedMon;

    sumTotal += payReal;

    const xMonth = payedMon > 1 ? `x${payedMon}` : "";
    const toAdd = (toAddVal > 0 && toAddVal <= overpayment) ? toAddVal : undefined;

    rows.push({
      monthCurrent,
      monthTotal,
      xMonth,
      currIncr,
      payBase,
      payReal,
      spareChange,
      spare,
      toAdd,
    });

    if (monthTotal >= months) {
      rows[rows.length - 1].theLast = true;
      break;
    }
    currIncr = currIncr * (1 + incr / 100);
  }

  return rows;
};

type CalculatePatams = Parameters<typeof calculate>;

const Result = ({ params }) => {
  const initialAmount = parseFloat(params.initialAmount);
  const overpayment = parseFloat(params.overpayment);

  // required params
  const parsed = [
    initialAmount,
    parseFloat(params.months),
    parseFloat(params.incr),
    parseFloat(params.maxSum),
  ];
  if (!parsed.every(Boolean)) {
    return <></>;
  }
  // optional params
  parsed.push(parseFloat(params.spare));
  parsed.push(overpayment);

  const rows = calculate(...parsed as CalculatePatams);

  const totalSum = rows.reduce((acc, row) => acc + row.payReal, 0);
  const overPay = totalSum - initialAmount;
  const RESULT = { totalSum, overPay };

  return (
    <table>
      <tr>
        <th>{LOCALE.month}</th>
        <th>{LOCALE.payed}</th>
        <th></th>

        <th>{LOCALE.incrShort}</th>
        <th class="gray">{LOCALE.base}</th>
        <th>{LOCALE.pay}</th>

        <th>{LOCALE.spareShort} +/-</th>
        <th class="gray">{LOCALE.spareIn}</th>
        <th class="gray">{
          overpayment ? LOCALE.overpaymentShort + " < " + overpayment : ""
        }</th>
      </tr>

      {rows.map((row) => (
        <tr>
          <td>{row.monthCurrent}</td>
          <td>{row.monthTotal}</td>
          <td>{row.xMonth}</td>

          <td>{n4(row.currIncr)}</td>
          <td class="gray">{n2(row.payBase)}</td>
          <td>{n2(row.payReal)}</td>

          <td>{n2(row.spareChange)}</td>
          <td class={!row.theLast ? "gray" : ""}>{n2(row.spare)}</td>
          <td class="gray">{!row.theLast && row.toAdd ? n2(row.toAdd) : ""}</td>
        </tr>
      ))}

      {["totalSum", "overPay"].map((key) => (
        <tr>
          <td></td>
          <td></td>
          <td></td>

          <td></td>
          <td>{LOCALE[key] ?? key}</td>
          <td>{n2(RESULT[key])}</td>

          <td></td>
          <td></td>
          <td></td>
        </tr>
      ))}
    </table>
  );
};


const Input = ({name, value, step, min}) => (
  <div>
    <label>{LOCALE[name] ?? name}</label>
    <input
      type="number"
      name={name}
      step={step ?? 1}
      min={min ?? 0}
      value={value}
    />
  </div>
);

const App = ({ params }) => {
  return (
    <>
      <form action="/" method="GET">
        <div class="grid">
          <Input name="initialAmount" value={params.initialAmount} />
          <Input name="months" value={params.months} min={1} />
          <Input name="incr" value={params.incr} step={0.01} />
        </div>

        <div class="grid">
          <Input name="maxSum" value={params.maxSum} />
          <Input name="spare" value={params.spare} />
          <Input name="overpayment" value={params.overpayment} />
        </div>

        <div class="grid grid-last">
          <button type="submit">{LOCALE.calculate}</button>
        </div>
      </form>

      <hr />

      <Result params={params} />
    </>
  );
};

const styles = `
  body {
    max-width: initial;
    padding: 5px 50px;
  }

  .grid {
    display: flex;
    gap: 6px;
    align-items: end;
  }

  .grid-last {
    margin-top: 6px;
  }

  input:invalid {
    box-shadow: 0 0 0 2px hsl(5, 67%, 45%);
  }

  .gray {
    color: #bbb;
  }
`;

const application = async (request: Request) => {
	 const url = new URL(request.url);
   const search = new URLSearchParams(url.search);
   const params = Object.fromEntries(search.entries());

  return html({
    title: "FlatCalculator",
    styles: [
      {
        href: "https://cdn.jsdelivr.net/npm/water.css/out/water.min.css",
      },
      styles,
    ],
    body: <App params={params} />,
  });
};

export default application;
