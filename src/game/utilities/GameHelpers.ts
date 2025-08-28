export const createAngleVelocityUI = (
  player: number,
  eventCallback: (
    angleInput: HTMLInputElement,
    velocityInput: HTMLInputElement
  ) => void
) => {
  const backgroundColor = "#00009D";
  const borderStyle = "2px solid white";
  const fontFamily = "'Courier New', monospace";

  const playerSetting = ["flex-start", "flex-end"];

  // --- Container ---
  const container = document.createElement("div");
  container.id = "projectile-ui";
  container.style.position = "absolute";
  container.style.display = "flex";
  container.style.justifyContent = playerSetting[player];
  container.style.alignItems = "flex-start";
  container.style.top = "10px";
  container.style.width = "990px";
  container.style.left = "50px";
  container.style.zIndex = "10";
  container.style.fontFamily = fontFamily;
  container.style.color = "white";

  const inputs = document.createElement("div");
  inputs.style.display = "flex";
  inputs.style.flexDirection = "column";
  inputs.style.gap = "6px";
  container.appendChild(inputs);

  // --- Player Name ---
  const playerName = document.createElement("p");
  playerName.style.color = "white";
  playerName.style.fontSize = "22pt";
  playerName.style.margin = "2pt 0";
  playerName.textContent = `Player ${player}`;
  inputs.appendChild(playerName);

  // --- Angle Input ---
  const angleContainer = document.createElement("div");
  angleContainer.style.display = "flex";
  angleContainer.style.alignItems = "center";
  angleContainer.style.gap = "4px";
  inputs.appendChild(angleContainer);

  const angleInput = document.createElement("input");
  angleInput.type = "number";
  angleInput.min = "0";
  angleInput.max = "180";
  angleInput.value = "45";
  angleInput.style.background = backgroundColor;
  angleInput.style.border = borderStyle;
  angleInput.style.color = "white";
  angleInput.style.padding = "2px 6px";
  angleInput.style.width = "60px";
  angleInput.style.fontFamily = fontFamily;
  angleInput.style.fontSize = "14px";
  angleInput.style.outline = "none";
  angleInput.style.borderRadius = "0";

  angleContainer.appendChild(document.createTextNode("Angle: "));
  angleContainer.appendChild(angleInput);
  angleContainer.appendChild(document.createTextNode("°"));

  // --- Velocity Input ---
  const velocityContainer = document.createElement("div");
  velocityContainer.style.display = "flex";
  velocityContainer.style.alignItems = "center";
  velocityContainer.style.gap = "4px";
  inputs.appendChild(velocityContainer);

  const velocityInput = document.createElement("input");
  velocityInput.type = "number";
  velocityInput.min = "0";
  velocityInput.max = "100";
  velocityInput.value = "50";
  // Copy style manually to be TS-safe
  velocityInput.style.background = backgroundColor;
  velocityInput.style.border = borderStyle;
  velocityInput.style.color = "white";
  velocityInput.style.padding = "2px 6px";
  velocityInput.style.width = "60px";
  velocityInput.style.fontFamily = fontFamily;
  velocityInput.style.fontSize = "14px";
  velocityInput.style.outline = "none";
  velocityInput.style.borderRadius = "0";

  velocityContainer.appendChild(document.createTextNode("Velocity: "));
  velocityContainer.appendChild(velocityInput);

  // --- Shoot Button ---
  const shootButton = document.createElement("button");
  shootButton.innerText = "Throw!";
  shootButton.style.background = backgroundColor;
  shootButton.style.color = "white";
  shootButton.style.border = borderStyle;
  shootButton.style.padding = "4px 12px";
  shootButton.style.fontFamily = fontFamily;
  shootButton.style.fontSize = "14px";
  shootButton.style.cursor = "pointer";
  shootButton.style.outline = "none";
  shootButton.style.transition = "0.1s";

  shootButton.onmouseover = () => {
    shootButton.style.background = "white";
    shootButton.style.color = backgroundColor;
  };
  shootButton.onmouseout = () => {
    shootButton.style.background = backgroundColor;
    shootButton.style.color = "white";
  };

  inputs.appendChild(shootButton);
  document.body.appendChild(container);

  // --- Event Listener ---
  shootButton.addEventListener("click", () =>
    eventCallback(angleInput, velocityInput)
  );
};

export const createStarRectangle = (context: any) => {
  // look we're not going to talk about this.
  // i just wanted to learn a bit about phaser and i don't care
  // i'm not the police
  context.add.text(
    10,
    10,
    "*    *    *    *    *    *    *    *    *    *    *    *",
    { color: "red", fontFamily: "Courier New", fontSize: 32 }
  );
  context.add.text(
    10,
    550,
    "*    *    *    *    *    *    *    *    *    *    *    *",
    { color: "red", fontFamily: "Courier New", fontSize: 32 }
  );
  context.add.text(10, 112, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });
  context.add.text(10, 224, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });

  context.add.text(10, 336, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });

  context.add.text(10, 448, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });

  context.add.text(972, 112, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });
  context.add.text(972, 224, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });

  context.add.text(972, 336, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });

  context.add.text(972, 448, "*", {
    color: "red",
    fontFamily: "Courier New",
    fontSize: 32,
  });

  context.title = context.add
    .text(512, 200, "R A T S", {
      fontFamily: "Courier",
      fontSize: 38,
      color: "#ffffff",
      align: "center",
    })
    .setOrigin(0.5);
};
