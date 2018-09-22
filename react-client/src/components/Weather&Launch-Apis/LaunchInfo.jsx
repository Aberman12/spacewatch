import React from "react";
import $ from "jquery";
import { flag } from "country-code-emoji";

class LaunchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
      showLaunchNum: 0,
      missionDescription: "Undisclosed",
      launchList: {
        launches: [
          {
            rocket: {
              name: ""
            },
            location: {
              countryCode: ""
            }
          },
          {
            rocket: {
              name: ""
            },
            location: {
              countryCode: ""
            }
          },
          {
            rocket: {
              name: ""
            },
            location: {
              countryCode: ""
            }
          },
          {
            rocket: {
              name: ""
            },
            location: {
              countryCode: ""
            }
          },
          {
            rocket: {
              name: ""
            },
            location: {
              countryCode: ""
            }
          }
        ]
      }
    };
  }

  componentDidMount() {
    var url = "https://launchlibrary.net/1.4/launch/next/5";
    var here = this;
    $.ajax({
      url: url,
      dataType: "json",
      success: function(response) {
        here.setState({ launchList: response });
      }
    });
  }

  createCountryFlag(code) {
    var countries = {
      BD: "BGD",
      BE: "BEL",
      BF: "BFA",
      BG: "BGR",
      BA: "BIH",
      BB: "BRB",
      WF: "WLF",
      BL: "BLM",
      BM: "BMU",
      BN: "BRN",
      BO: "BOL",
      BH: "BHR",
      BI: "BDI",
      BJ: "BEN",
      BT: "BTN",
      JM: "JAM",
      BV: "BVT",
      BW: "BWA",
      WS: "WSM",
      BQ: "BES",
      BR: "BRA",
      BS: "BHS",
      JE: "JEY",
      BY: "BLR",
      BZ: "BLZ",
      RU: "RUS",
      RW: "RWA",
      RS: "SRB",
      TL: "TLS",
      RE: "REU",
      TM: "TKM",
      TJ: "TJK",
      RO: "ROU",
      TK: "TKL",
      GW: "GNB",
      GU: "GUM",
      GT: "GTM",
      GS: "SGS",
      GR: "GRC",
      GQ: "GNQ",
      GP: "GLP",
      JP: "JPN",
      GY: "GUY",
      GG: "GGY",
      GF: "GUF",
      GE: "GEO",
      GD: "GRD",
      GB: "GBR",
      GA: "GAB",
      SV: "SLV",
      GN: "GIN",
      GM: "GMB",
      GL: "GRL",
      GI: "GIB",
      GH: "GHA",
      OM: "OMN",
      TN: "TUN",
      JO: "JOR",
      HR: "HRV",
      HT: "HTI",
      HU: "HUN",
      HK: "HKG",
      HN: "HND",
      HM: "HMD",
      VE: "VEN",
      PR: "PRI",
      PS: "PSE",
      PW: "PLW",
      PT: "PRT",
      SJ: "SJM",
      PY: "PRY",
      IQ: "IRQ",
      PA: "PAN",
      PF: "PYF",
      PG: "PNG",
      PE: "PER",
      PK: "PAK",
      PH: "PHL",
      PN: "PCN",
      PL: "POL",
      PM: "SPM",
      ZM: "ZMB",
      EH: "ESH",
      EE: "EST",
      EG: "EGY",
      ZA: "ZAF",
      EC: "ECU",
      IT: "ITA",
      VN: "VNM",
      SB: "SLB",
      ET: "ETH",
      SO: "SOM",
      ZW: "ZWE",
      SA: "SAU",
      ES: "ESP",
      ER: "ERI",
      ME: "MNE",
      MD: "MDA",
      MG: "MDG",
      MF: "MAF",
      MA: "MAR",
      MC: "MCO",
      UZ: "UZB",
      MM: "MMR",
      ML: "MLI",
      MO: "MAC",
      MN: "MNG",
      MH: "MHL",
      MK: "MKD",
      MU: "MUS",
      MT: "MLT",
      MW: "MWI",
      MV: "MDV",
      MQ: "MTQ",
      MP: "MNP",
      MS: "MSR",
      MR: "MRT",
      IM: "IMN",
      UG: "UGA",
      TZ: "TZA",
      MY: "MYS",
      MX: "MEX",
      IL: "ISR",
      FR: "FRA",
      IO: "IOT",
      SH: "SHN",
      FI: "FIN",
      FJ: "FJI",
      FK: "FLK",
      FM: "FSM",
      FO: "FRO",
      NI: "NIC",
      NL: "NLD",
      NO: "NOR",
      NA: "NAM",
      VU: "VUT",
      NC: "NCL",
      NE: "NER",
      NF: "NFK",
      NG: "NGA",
      NZ: "NZL",
      NP: "NPL",
      NR: "NRU",
      NU: "NIU",
      CK: "COK",
      XK: "XKX",
      CI: "CIV",
      CH: "CHE",
      CO: "COL",
      CN: "CHN",
      CM: "CMR",
      CL: "CHL",
      CC: "CCK",
      CA: "CAN",
      CG: "COG",
      CF: "CAF",
      CD: "COD",
      CZ: "CZE",
      CY: "CYP",
      CX: "CXR",
      CR: "CRI",
      CW: "CUW",
      CV: "CPV",
      CU: "CUB",
      SZ: "SWZ",
      SY: "SYR",
      SX: "SXM",
      KG: "KGZ",
      KE: "KEN",
      SS: "SSD",
      SR: "SUR",
      KI: "KIR",
      KH: "KHM",
      KN: "KNA",
      KM: "COM",
      ST: "STP",
      SK: "SVK",
      KR: "KOR",
      SI: "SVN",
      KP: "PRK",
      KW: "KWT",
      SN: "SEN",
      SM: "SMR",
      SL: "SLE",
      SC: "SYC",
      KZ: "KAZ",
      KY: "CYM",
      SG: "SGP",
      SE: "SWE",
      SD: "SDN",
      DO: "DOM",
      DM: "DMA",
      DJ: "DJI",
      DK: "DNK",
      VG: "VGB",
      DE: "DEU",
      YE: "YEM",
      DZ: "DZA",
      US: "USA",
      UY: "URY",
      YT: "MYT",
      UM: "UMI",
      LB: "LBN",
      LC: "LCA",
      LA: "LAO",
      TV: "TUV",
      TW: "TWN",
      TT: "TTO",
      TR: "TUR",
      LK: "LKA",
      LI: "LIE",
      LV: "LVA",
      TO: "TON",
      LT: "LTU",
      LU: "LUX",
      LR: "LBR",
      LS: "LSO",
      TH: "THA",
      TF: "ATF",
      TG: "TGO",
      TD: "TCD",
      TC: "TCA",
      LY: "LBY",
      VA: "VAT",
      VC: "VCT",
      AE: "ARE",
      AD: "AND",
      AG: "ATG",
      AF: "AFG",
      AI: "AIA",
      VI: "VIR",
      IS: "ISL",
      IR: "IRN",
      AM: "ARM",
      AL: "ALB",
      AO: "AGO",
      AQ: "ATA",
      AS: "ASM",
      AR: "ARG",
      AU: "AUS",
      AT: "AUT",
      AW: "ABW",
      IN: "IND",
      AX: "ALA",
      AZ: "AZE",
      IE: "IRL",
      ID: "IDN",
      UA: "UKR",
      QA: "QAT",
      MZ: "MOZ"
    };
    for (var props in countries) {
      if (countries[props] === code) {
        var newCountryCode = props.toString();
        return flag(newCountryCode);
      }
    }
  }

  showInfo(launch) {
    if (this.state.launchList.launches[launch].missions.length) {
      this.setState({
        missionDescription: this.state.launchList.launches[launch].missions[0]
          .description
      });
    }

    this.setState({ showList: false, showLaunchNum: launch });
  }

  back() {
    this.setState({ showList: true });
  }

  render() {
    let is = this.state.showList;
    return (
      <div className="launchInfo">
        {is ? (
          <div>
            <div>
              <strong>
                <h3>Upcoming Launches</h3>
              </strong>
            </div>
            <div>
              <p className="insideLaunch">
                {this.state.launchList.launches[0].rocket.name}
              </p>
              <p>
                1. {this.state.launchList.launches[0].location.countryCode}{" "}
                {this.createCountryFlag(
                  this.state.launchList.launches[0].location.countryCode
                )}{" "}
                <a
                  className="launchArrow"
                  onClick={() => {
                    this.showInfo(0);
                  }}
                >
                  &#9658;
                </a>
              </p>
              <hr className="hr-saved" />
            </div>
            <div>
              <p className="insideLaunch">
                {this.state.launchList.launches[1].rocket.name}
              </p>
              <p>
                {" "}
                2. {this.state.launchList.launches[1].location.countryCode}{" "}
                {this.createCountryFlag(
                  this.state.launchList.launches[1].location.countryCode
                )}{" "}
                <a
                  className="launchArrow"
                  onClick={() => {
                    this.showInfo(1);
                  }}
                >
                  &#9658;
                </a>
              </p>
              <hr className="hr-saved" />
            </div>
            <div>
              <p className="insideLaunch">
                {this.state.launchList.launches[2].rocket.name}
              </p>
              <p>
                3. {this.state.launchList.launches[2].location.countryCode}{" "}
                {this.createCountryFlag(
                  this.state.launchList.launches[2].location.countryCode
                )}{" "}
                <a
                  className="launchArrow"
                  onClick={() => {
                    this.showInfo(2);
                  }}
                >
                  &#9658;
                </a>
              </p>
              <hr className="hr-saved" />
            </div>
            <div>
              <p className="insideLaunch">
                {this.state.launchList.launches[3].rocket.name}
              </p>
              <p>
                4. {this.state.launchList.launches[3].location.countryCode}{" "}
                {this.createCountryFlag(
                  this.state.launchList.launches[3].location.countryCode
                )}{" "}
                <a
                  className="launchArrow"
                  onClick={() => {
                    this.showInfo(3);
                  }}
                >
                  &#9658;
                </a>
              </p>
              <hr className="hr-saved" />
            </div>
            <div>
              <p className="insideLaunch">
                {this.state.launchList.launches[4].rocket.name}
              </p>
              <p>
                5. {this.state.launchList.launches[4].location.countryCode}{" "}
                {this.createCountryFlag(
                  this.state.launchList.launches[4].location.countryCode
                )}{" "}
                <a
                  className="launchArrow"
                  onClick={() => {
                    this.showInfo(4);
                  }}
                >
                  &#9658;
                </a>
              </p>
              <hr className="hr-saved" />
            </div>
          </div>
        ) : (
          <div>
            <button className="launchBack" onClick={() => this.back()}>
              &#60;
            </button>
            <div>
              <p className="insideLaunch">Company:</p>
              <p>
                {
                  this.state.launchList.launches[this.state.showLaunchNum].lsp
                    .name
                }
              </p>
            </div>
            <div>
              <p className="insideLaunch">Launch Location:</p>
              <p>
                {
                  this.state.launchList.launches[this.state.showLaunchNum]
                    .location.name
                }
              </p>
            </div>
            <div>
              <p className="insideLaunch">Launch Date:</p>
              <p>
                {this.state.launchList.launches[this.state.showLaunchNum].net}
              </p>
            </div>
            <div>
              <p className="insideLaunch">Mission:</p>
              <p>{this.state.missionDescription.substring(0, 290)}</p>
            </div>
            {this.state.launchList.launches[this.state.showLaunchNum]
              .vidURLs[0] ? (
              <div>
                <a
                  target="_blank"
                  href={
                    this.state.launchList.launches[this.state.showLaunchNum]
                      .vidURLs[0]
                  }
                >
                  <p>Click Here to View Footage</p>
                </a>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default LaunchInfo;
