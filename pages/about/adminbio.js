

export default function Adminbio() {
    return (
        <AdminBio />
    );
}








const AdminBio = () => {
    return (
        <div className="admin-container">
            <div className="admin">
                <h1>Adminisration of the trust</h1>
            </div>

            <div className="content">
                {
                    AdminList.map(a => <div className="content-box" key={a.value}>
                        <img alt={a.value} src={a.src} />
                        <p>{a.value}</p>
                    </div>)
                }
            </div>
            <div className="trust">
                <h1>Powers Of Trustee</h1>
                {
                    TrustList.map(a => <div className="trust-box" key={a.value}>
                        <img alt={a.value} src={a.src} />
                        <p>{a.value}</p>
                    </div>)
                }
            </div>
        </div>
    );
};




const AdminList = [
    {
        src: "/servicons/checkmark.png",
        value: "The Trustees shall be administered by Board of Trustees as constituted above. The Author Trustee S. SELVAKUMAR shall be authorized to take decision on the Administration of the Trust. His actions shall be binding on other Trustees."
    },
    {
        src: "/servicons/checkmark.png",
        value: "The above Trustees shall hold office till their life time."
    },
    {
        src: "/servicons/checkmark.png",
        value: ". The Board of Trustees is empowered to co-opt one or more trustees. However the total number shall not exceed SEVEN."
    },
    {
        src: "/servicons/checkmark.png",
        value: "All the Trustees shall be resident of India and any trustee who leaves India will permanently vacate his office."
    },

    {
        src: "/servicons/checkmark.png",
        value: " The Trustees shall cease to hold office a. On his/her death. b. On his resignationc. On becoming insolvent."
    },
    {
        src: "/servicons/checkmark.png",
        value: "On his being expelled by Board of Trustees for his acting or having acted against  the interest of the Trust by majority vote, provided such trustee has been given reasonable opportunity of explaining his conduct to the Board of Trustees"
    },
    {
        src: "/servicons/checkmark.png",
        value: "Any vacancy caused in the office of Trustees under the circumstances described in clause 5 shall be filled up by AUTHOR TRUSTEE S. SELVAKUMAR and the  trustee so nominated shall hold office for the unexpired term of the trustees vacating the office. "
    },
    {
        src: "/servicons/checkmark.png",
        value: " The Author Trustee S. SELVAKUMAR shall be the Chairman and he shall hold office for life. The Board of Trustees shall also determine the powers, duties,  responsibilities and other terms and conditions connected therewith. The Board of Trustees shall have the power to vary the terms of appointment."
    },
    {
        src: "/servicons/checkmark.png",
        value: "The Board of Trustees may appoint from trustees an Hon. Secretary of the Trust and determine his period of office. Powers, duties, responsibilities and other terms and conditions connected therewith. The Board of Trustees shall have the power to vary the terms of appointment. However AUTHOR TRUSTEE S. SELVAKUMARshall take final call on the above powers. "
    },
    {
        src: "/servicons/checkmark.png",
        value: " To receive any money or other assets in any shape or forms as gifts, donation and to hold the same as capital fund or apply it to for furthering the objects of the Trust."
    },
    {
        src: "/servicons/checkmark.png",
        value: "To invest the funds from time to time in such manner as may be permitted under the provisions of Income-tax Act and to dispose off, alter and vary the investment time to time to realise the investment. "
    },
];


const TrustList = [
    {
        src: "/servicons/checkmark.png",
        value: " To apply and use funds for all or any of the objects of the Trust and to accumulate the surplus and applied portion of Income and invest the same subject to theprovisions of Section 13 (1) (d) read with Section 11 (5) of the Income-tax Act 1961  as amended from time to time relating to accumulation of income and investments in  the modes specified under the provisions of the Income tax Act 1961 governing  charitable Trusts"
    },
    {
        src: "/servicons/checkmark.png",value: " To appoint committees or sub-committees from among the members of the Boardalong with others and assign duties and to frame such rules of business as the board shall think fit and alter and vary the same from time to time provided such rules of  business shall not be inconsistent with the terms of these presents. The Board shall be entitled to frame, constitute and regulate the procedures of such committees or subcommittee. The Author Trustee S. SELVAKUMAR shall have final say on the above  matters"
    },
    {
        src: "/servicons/checkmark.png",
        value: " The Board of Trustees shall delegate all or any of the powers vested in them to such persons for any of the period as they deem fit and may at any time revoke, vary, alter,  rescind such powers delegated"
    },
    {
        src: "/servicons/checkmark.png",
        value: "The Board of Trustees may appoint a treasurer amongst the trustees. The treasurer  shall keep the books of accounts and record or cause to be recorded the Receipts and payments and also maintain and cause to maintain documents relating to thesetransaction. The accounts shall be audited once a year by a qualified Chartered Accountant."
    },
    {
        src: "/servicons/checkmark.png",
        value: " All legal proceedings by or against the Trust shall be initiated in the name of the Trust through its chairman."
    },
];