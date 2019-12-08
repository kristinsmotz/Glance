import document from "document";
import { vibration } from "haptics";

// let container = document.getElementById("container");
let logTreatmentBtn = document.getElementById("logTreatmentBtn");
let actionsContainer = document.getElementById("actions");
let homeContainer = document.getElementById("home");

export default class actions {
  /**
   * Init the actions page
   * @param {notsure} transfer module used for sending data back to the phone
   */
  init(transfer, singleOrMultipleDispaly, settings) {
    // check to see if one of the users is using nightscout and that they have ented a token
    if (
      (settings.dataSource == "nightscout" && settings.treatmentUrl) ||
      (settings.dataSourceTwo == "nightscout" && settings.treatmentUrlTwo)
    ) {
      logTreatmentBtn.style.display = "inline";
    } else {
      logTreatmentBtn.style.display = "none";
    }
    /**
     * Try to refresh the data
     */
    let refreshData = document.getElementById("refreshDataBtn");
    refreshData.onclick = evt => {
      console.log("Refresh data");
      var dataToSend = {
        command: "refreshData"
      };
      transfer.send(dataToSend);
      vibration.start("bump");
      actionsContainer.style.display = "none";
      homeContainer.style.display = "inline";

      const BloodSugarDisplayContainer = singleOrMultipleDispaly.getElementsByClassName(
        "bloodSugarDisplay"
      );
      BloodSugarDisplayContainer.forEach((container, index) => {
        container.getElementById("arrows").href =
          "../resources/img/arrows/loading.png";
      });
    };

    /**
     * Go to Action
     */
    let goToActions = document.getElementById("goToActions");
    goToActions.onclick = evt => {
      vibration.start("bump");
      actionsContainer.style.display = "inline";
      homeContainer.style.display = "none";
    };

    /**
     * Go Home on click
     */
    let goHome = document.getElementById("goHomeBtn");
    goHome.onclick = evt => {
      console.log("goHome");
      vibration.start("bump");
      actionsContainer.style.display = "none";
      homeContainer.style.display = "inline";
    };

    /**
     * Go Home on click
     */
    let treatmentsScreen = document.getElementById("treatmentsScreen");
    logTreatmentBtn.onclick = evt => {
      console.log("logTreatment");
      treatmentsScreen.style.display = "inline";
      vibration.start("bump");
    };
  }
}