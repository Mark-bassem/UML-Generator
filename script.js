(() => {
  // --- Templates ---
  const templates = {
  usecase: `graph TD
Customer --> Login[Login to System]
Customer --> OpenAccount[Open Account]
Customer --> Deposit[Deposit Money]
Customer --> Withdraw[Withdraw Money]
Customer --> Transfer[Transfer Funds]
Customer --> CheckBalance[Check Balance]
Customer --> ViewStatement[View Account Statement]
BankEmployee --> ManageCustomer[Manage Customers]
BankEmployee --> ManageAccounts[Manage Accounts]
BankEmployee --> ApproveLoan[Approve Loans]
Admin --> ManageEmployees[Manage Bank Employees]
Admin --> GenerateReports[Generate Reports]`,

  class: `classDiagram
class Customer {
  -id: int
  -name: string
  -email: string
  +login()
  +deposit(amount)
  +withdraw(amount)
  +transfer(toAccount, amount)
  +viewStatement()
}
class Account {
  -accountNumber: string
  -balance: float
  -type: string
  +deposit(amount)
  +withdraw(amount)
  +transfer(toAccount, amount)
}
class Transaction {
  -id: int
  -amount: float
  -date: Date
  -type: string
}
class Employee {
  -employeeId: int
  -name: string
  +manageCustomer()
  +approveLoan()
}
class BankSystem {
  +authenticate(user)
  +generateReport()
}
Customer --> Account
Account --> Transaction
Employee --> Customer
BankSystem --> Customer
BankSystem --> Employee`,

  sequence: `sequenceDiagram
actor Customer
participant BankSystem
participant AccountDB
participant TransactionDB

Customer ->> BankSystem: Request Transfer(toAccount, amount)
BankSystem ->> AccountDB: Validate Sender Account & Balance
AccountDB -->> BankSystem: Validation Result
alt Balance Sufficient
    BankSystem ->> AccountDB: Deduct Amount from Sender
    BankSystem ->> AccountDB: Add Amount to Receiver
    BankSystem ->> TransactionDB: Log Transaction
    TransactionDB -->> BankSystem: Transaction Logged
    BankSystem -->> Customer: Transfer Successful
else Balance Insufficient
    BankSystem -->> Customer: Transfer Failed - Insufficient Funds
end`
};


  // --- DOM Elements ---
  const codeInput = document.getElementById("codeInput");
  const renderBtn = document.getElementById("renderBtn");
  const diagramDiv = document.getElementById("diagram");
  const diagramType = document.getElementById("diagramType");
  const btnSVG = document.getElementById("downloadSVG");
  const btnPNG = document.getElementById("downloadPNG");

  let currentSVG = "";

  // --- Initialize Mermaid ---
  mermaid.initialize({ startOnLoad: false, theme: "base" });

  // --- Auto-fill template on diagram type change ---
  diagramType.addEventListener("change", () => {
    const type = diagramType.value;
    codeInput.value = templates[type];
  });

  // Initialize default template
  diagramType.value = "usecase";
  codeInput.value = templates.usecase;

  // --- Render Diagram ---
  function renderDiagram() {
    const code = codeInput.value.trim();
    if (!code) {
      diagramDiv.innerHTML = "<div class='muted'>No content</div>";
      currentSVG = "";
      return;
    }

    diagramDiv.innerHTML = `<div class="mermaid">${code}</div>`;

    try {
      mermaid.init(undefined, diagramDiv.querySelectorAll(".mermaid"));
      currentSVG = diagramDiv.innerHTML;
    } catch (err) {
      diagramDiv.innerHTML = `<div class='muted'>Drawing error: ${err.message}</div>`;
      currentSVG = "";
    }
  }

  renderBtn.addEventListener("click", renderDiagram);

  // --- Download SVG ---
  btnSVG.addEventListener("click", () => {
    if (!currentSVG) return alert("No drawing available for download");

    const blob = new Blob([currentSVG], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // --- Download PNG ---
  btnPNG.addEventListener("click", () => {
    if (!currentSVG) return alert("No drawing available for download");

    const img = new Image();
    const svgBlob = new Blob([currentSVG], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width || 800;
      canvas.height = img.height || 600;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; // white background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "diagram.png";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
        URL.revokeObjectURL(url);
      }, "image/png");

      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      alert("Failed to convert drawing to PNG. Try uploading the SVG instead");
      URL.revokeObjectURL(url);
    };

    img.src = url;
  });

})();
