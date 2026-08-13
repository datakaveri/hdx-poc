// Ported near-verbatim from DiabeticGlaucoma/mCxDE_diabetes_v11.html (mC(Dia)DE v11).
// These are also what fhir/structure_definitions and fhir/patient_bundles are
// extracted from and uploaded to the FHIR server via fhir/upload.sh.

import { FhirSample } from '../concept-graph/concept-graph.types';

export const mcxdeFhirSamples: Record<string, FhirSample> = {
  "diabetesCondition": {
    "title": "Diabetes Condition",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "dccm-diabetes-condition",
      "url": "https://example.org/fhir/StructureDefinition/dccm-diabetes-condition",
      "version": "0.1.0",
      "name": "DiabetesCondition",
      "title": "Diabetes Condition Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Model",
      "description": "An mCODE-inspired FHIR R4 profile for representing an asserted diabetes diagnosis or condition. This prototype constrains the base Condition resource and marks the clinical status, verification status, diabetes code, patient, onset, recorded date, supporting evidence, and notes as key interoperable elements.",
      "purpose": "Prototype only. It demonstrates how a diabetes clinical-model box can be expressed as a constrained FHIR R4 resource in the same profile-oriented style used by mCODE.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition"
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-condition-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-example",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-example",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/hba1c-supporting-example",
          "resource": {
            "resourceType": "Observation",
            "id": "hba1c-supporting-example",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "4548-4",
                  "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
                }
              ],
              "text": "HbA1c"
            },
            "subject": {
              "reference": "Patient/diabetes-example"
            },
            "effectiveDateTime": "2026-07-28T09:15:00+05:30",
            "valueQuantity": {
              "value": 7.2,
              "unit": "%",
              "system": "http://unitsofmeasure.org",
              "code": "%"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-condition-example",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-condition-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/dccm-diabetes-condition"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-example"
            },
            "onsetDateTime": "2018-03-12",
            "recordedDate": "2018-03-12",
            "evidence": [
              {
                "detail": [
                  {
                    "reference": "Observation/hba1c-supporting-example",
                    "display": "HbA1c supporting diagnostic assessment"
                  }
                ]
              }
            ],
            "note": [
              {
                "text": "Example only: classification, etiology, disease course, and complications can be represented by linked resources in the wider diabetes clinical model."
              }
            ]
          }
        }
      ]
    }
  },
  "glycemicAssessment": {
    "title": "Glycemic Assessment",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "dccm-glycemic-assessment",
      "url": "https://example.org/fhir/StructureDefinition/dccm-glycemic-assessment",
      "version": "0.1.0",
      "name": "GlycemicAssessment",
      "title": "Glycemic Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Model",
      "description": "An mCODE-inspired FHIR R4 profile for diabetes-related glycemic observations. It uses the base Observation resource for coded measurements such as HbA1c and can also support structured summary components for glucose-monitoring assessments.",
      "purpose": "Prototype only. It demonstrates how the Glycemic Assessment box can be represented through a constrained FHIR R4 Observation profile.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation"
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Use a LOINC code when an appropriate laboratory or quantitative glycemic observation code exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "glycemic-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/glycemic-example",
          "resource": {
            "resourceType": "Patient",
            "id": "glycemic-example",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/glycemic-assessment-example",
          "resource": {
            "resourceType": "Observation",
            "id": "glycemic-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/dccm-glycemic-assessment"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "4548-4",
                  "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
                }
              ],
              "text": "HbA1c"
            },
            "subject": {
              "reference": "Patient/glycemic-example"
            },
            "effectiveDateTime": "2026-07-28T09:15:00+05:30",
            "valueQuantity": {
              "value": 7.2,
              "unit": "%",
              "system": "http://unitsofmeasure.org",
              "code": "%"
            },
            "interpretation": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    "code": "H",
                    "display": "High"
                  }
                ]
              }
            ],
            "referenceRange": [
              {
                "high": {
                  "value": 6.5,
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                },
                "text": "Illustrative reference boundary for this example only"
              }
            ]
          }
        }
      ]
    }
  },
  "continuousGlucoseMonitoring": {
    "title": "Continuous Glucose Monitoring",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "dccm-continuous-glucose-monitoring",
      "url": "https://example.org/fhir/StructureDefinition/dccm-continuous-glucose-monitoring",
      "version": "0.1.0",
      "name": "ContinuousGlucoseMonitoring",
      "title": "Continuous Glucose Monitoring Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Model",
      "description": "An mCODE-inspired FHIR R4 profile for a continuous glucose monitoring (CGM) summary. The core summary is represented as an Observation with a reporting period, method, device, and structured components for sensor data sufficiency, mean glucose, GMI, time in/below/above range, glucose variability, and clinically relevant glucose patterns. The patient's CGM use start/stop period is represented by a related DeviceUseStatement in the example Bundle.",
      "purpose": "Prototype only. It demonstrates how every child concept under the Continuous Glucose Monitoring box can be represented using standard FHIR R4 elements and a related device-use resource, following the profile-oriented pattern used by mCODE.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation"
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for CGM summary/panel observations when an appropriate code exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Device"
                ]
              }
            ]
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true,
            "slicing": {
              "discriminator": [
                {
                  "type": "pattern",
                  "path": "code"
                }
              ],
              "ordered": false,
              "rules": "open"
            }
          },
          {
            "id": "Observation.component:sensorWear",
            "path": "Observation.component",
            "sliceName": "sensorWear",
            "min": 0,
            "max": "1",
            "mustSupport": true
          },
          {
            "id": "Observation.component:sensorWear.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                  "code": "sensor-wear-data-sufficiency"
                }
              ]
            }
          },
          {
            "id": "Observation.component:sensorWear.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component:meanGlucose",
            "path": "Observation.component",
            "sliceName": "meanGlucose",
            "min": 0,
            "max": "1",
            "mustSupport": true
          },
          {
            "id": "Observation.component:meanGlucose.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "97507-8"
                }
              ]
            }
          },
          {
            "id": "Observation.component:meanGlucose.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component:gmi",
            "path": "Observation.component",
            "sliceName": "gmi",
            "min": 0,
            "max": "1",
            "mustSupport": true
          },
          {
            "id": "Observation.component:gmi.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "97506-0"
                }
              ]
            }
          },
          {
            "id": "Observation.component:gmi.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component:tir",
            "path": "Observation.component",
            "sliceName": "tir",
            "min": 0,
            "max": "1",
            "mustSupport": true
          },
          {
            "id": "Observation.component:tir.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "97510-2"
                }
              ]
            }
          },
          {
            "id": "Observation.component:tir.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component:tbr",
            "path": "Observation.component",
            "sliceName": "tbr",
            "min": 0,
            "max": "1",
            "mustSupport": true
          },
          {
            "id": "Observation.component:tbr.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                  "code": "time-below-range-total"
                }
              ]
            }
          },
          {
            "id": "Observation.component:tbr.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component:tar",
            "path": "Observation.component",
            "sliceName": "tar",
            "min": 0,
            "max": "1",
            "mustSupport": true
          },
          {
            "id": "Observation.component:tar.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                  "code": "time-above-range-total"
                }
              ]
            }
          },
          {
            "id": "Observation.component:tar.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component:variability",
            "path": "Observation.component",
            "sliceName": "variability",
            "min": 0,
            "max": "1",
            "mustSupport": true
          },
          {
            "id": "Observation.component:variability.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "104638-2"
                }
              ]
            }
          },
          {
            "id": "Observation.component:variability.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component:patterns",
            "path": "Observation.component",
            "sliceName": "patterns",
            "min": 0,
            "max": "*",
            "mustSupport": true
          },
          {
            "id": "Observation.component:patterns.code",
            "path": "Observation.component.code",
            "min": 1,
            "patternCodeableConcept": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                  "code": "glucose-event-pattern"
                }
              ]
            }
          },
          {
            "id": "Observation.component:patterns.value[x]",
            "path": "Observation.component.value[x]",
            "min": 1,
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "continuous-glucose-monitoring-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/cgm-example",
          "resource": {
            "resourceType": "Patient",
            "id": "cgm-example",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Device/cgm-device-example",
          "resource": {
            "resourceType": "Device",
            "id": "cgm-device-example",
            "status": "active",
            "deviceName": [
              {
                "name": "Illustrative CGM sensor",
                "type": "user-friendly-name"
              }
            ],
            "type": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/dccm-device-type",
                  "code": "continuous-glucose-monitor",
                  "display": "Continuous glucose monitor"
                }
              ],
              "text": "Continuous glucose monitor"
            },
            "patient": {
              "reference": "Patient/cgm-example"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/DeviceUseStatement/cgm-use-example",
          "resource": {
            "resourceType": "DeviceUseStatement",
            "id": "cgm-use-example",
            "status": "active",
            "subject": {
              "reference": "Patient/cgm-example"
            },
            "timingPeriod": {
              "start": "2026-06-01",
              "end": "2026-08-11"
            },
            "recordedOn": "2026-08-11T08:45:00+05:30",
            "device": {
              "reference": "Device/cgm-device-example"
            },
            "note": [
              {
                "text": "Represents the graph child 'Use Start / Stop'."
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/cgm-summary-example",
          "resource": {
            "resourceType": "Observation",
            "id": "cgm-summary-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/dccm-continuous-glucose-monitoring"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "106793-3",
                  "display": "Continuous glucose monitoring time in ranges panel"
                }
              ],
              "text": "Continuous glucose monitoring summary"
            },
            "subject": {
              "reference": "Patient/cgm-example"
            },
            "effectivePeriod": {
              "start": "2026-07-28T00:00:00+05:30",
              "end": "2026-08-10T23:59:59+05:30"
            },
            "issued": "2026-08-11T08:30:00+05:30",
            "method": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/dccm-monitoring-method",
                  "code": "cgm",
                  "display": "Continuous glucose monitoring"
                }
              ],
              "text": "Continuous glucose monitoring"
            },
            "device": {
              "reference": "Device/cgm-device-example",
              "display": "Illustrative CGM sensor"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                      "code": "sensor-wear-data-sufficiency",
                      "display": "Sensor wear / data sufficiency"
                    }
                  ]
                },
                "valueQuantity": {
                  "value": 96,
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "http://loinc.org",
                      "code": "97507-8",
                      "display": "Average glucose [Mass/volume] in Interstitial fluid during Reporting Period"
                    }
                  ]
                },
                "valueQuantity": {
                  "value": 154,
                  "unit": "mg/dL",
                  "system": "http://unitsofmeasure.org",
                  "code": "mg/dL"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "http://loinc.org",
                      "code": "97506-0",
                      "display": "Glucose management indicator"
                    }
                  ]
                },
                "valueQuantity": {
                  "value": 7.0,
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "http://loinc.org",
                      "code": "97510-2",
                      "display": "Glucose measurements in range out of Total glucose measurements during reporting period"
                    }
                  ],
                  "text": "Time in Range (70-180 mg/dL)"
                },
                "valueQuantity": {
                  "value": 72,
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                      "code": "time-below-range-total",
                      "display": "Time Below Range"
                    }
                  ],
                  "text": "Time Below Range (<70 mg/dL)"
                },
                "valueQuantity": {
                  "value": 3,
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                      "code": "time-above-range-total",
                      "display": "Time Above Range"
                    }
                  ],
                  "text": "Time Above Range (>180 mg/dL)"
                },
                "valueQuantity": {
                  "value": 25,
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "http://loinc.org",
                      "code": "104638-2",
                      "display": "Glucose standard deviation/Glucose mean in Reporting Period Interstitial fluid by calculation"
                    }
                  ],
                  "text": "Glucose variability (coefficient of variation)"
                },
                "valueQuantity": {
                  "value": 34,
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/dccm-cgm-component",
                      "code": "glucose-event-pattern",
                      "display": "Glucose event / pattern"
                    }
                  ]
                },
                "valueString": "Repeated post-prandial hyperglycemia after the evening meal; no prolonged nocturnal hypoglycemia."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: device/method = Observation.device + method; use start/stop = DeviceUseStatement.timingPeriod; reporting period = effectivePeriod; all remaining CGM child metrics are represented as components."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesManagementPlan": {
    "title": "Diabetes Management Plan",
    "resource": "CarePlan",
    "baseUrl": "https://hl7.org/fhir/R4/careplan.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "dccm-diabetes-management-plan",
      "url": "https://example.org/fhir/StructureDefinition/dccm-diabetes-management-plan",
      "version": "0.1.0",
      "name": "DiabetesManagementPlan",
      "title": "Diabetes Management Plan Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Model",
      "description": "An mCODE-inspired FHIR R4 profile for a patient-specific diabetes management plan. Glycemic and weight goals are represented through Goal references, while monitoring, medication, lifestyle, hypoglycemia-safety, sick-day/ketone, referral, and follow-up plans are represented as CarePlan activities.",
      "purpose": "Prototype only. It demonstrates how every child concept under the Diabetes Management Plan box can be represented using the FHIR R4 CarePlan and Goal resources while retaining a profile-first design similar to mCODE.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "CarePlan",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/CarePlan",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "CarePlan",
            "path": "CarePlan"
          },
          {
            "id": "CarePlan.status",
            "path": "CarePlan.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "CarePlan.intent",
            "path": "CarePlan.intent",
            "min": 1,
            "mustSupport": true,
            "fixedCode": "plan"
          },
          {
            "id": "CarePlan.category",
            "path": "CarePlan.category",
            "mustSupport": true
          },
          {
            "id": "CarePlan.title",
            "path": "CarePlan.title",
            "mustSupport": true
          },
          {
            "id": "CarePlan.subject",
            "path": "CarePlan.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "CarePlan.period",
            "path": "CarePlan.period",
            "mustSupport": true
          },
          {
            "id": "CarePlan.addresses",
            "path": "CarePlan.addresses",
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Condition"
                ]
              }
            ]
          },
          {
            "id": "CarePlan.goal",
            "path": "CarePlan.goal",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Goal"
                ]
              }
            ]
          },
          {
            "id": "CarePlan.activity",
            "path": "CarePlan.activity",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "CarePlan.activity.detail",
            "path": "CarePlan.activity.detail",
            "mustSupport": true
          },
          {
            "id": "CarePlan.activity.detail.kind",
            "path": "CarePlan.activity.detail.kind",
            "mustSupport": true
          },
          {
            "id": "CarePlan.activity.detail.code",
            "path": "CarePlan.activity.detail.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "CarePlan.activity.detail.status",
            "path": "CarePlan.activity.detail.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "CarePlan.activity.detail.goal",
            "path": "CarePlan.activity.detail.goal",
            "mustSupport": true
          },
          {
            "id": "CarePlan.activity.detail.scheduled[x]",
            "path": "CarePlan.activity.detail.scheduled[x]",
            "mustSupport": true
          },
          {
            "id": "CarePlan.activity.detail.description",
            "path": "CarePlan.activity.detail.description",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-management-plan-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/careplan-example",
          "resource": {
            "resourceType": "Patient",
            "id": "careplan-example",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/careplan-diabetes-condition",
          "resource": {
            "resourceType": "Condition",
            "id": "careplan-diabetes-condition",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ]
            },
            "subject": {
              "reference": "Patient/careplan-example"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Goal/glycemic-goal-example",
          "resource": {
            "resourceType": "Goal",
            "id": "glycemic-goal-example",
            "lifecycleStatus": "active",
            "description": {
              "text": "Individual glycemic goal: HbA1c less than 7.0% unless revised through shared decision-making."
            },
            "subject": {
              "reference": "Patient/careplan-example"
            },
            "target": [
              {
                "measure": {
                  "coding": [
                    {
                      "system": "http://loinc.org",
                      "code": "4548-4",
                      "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
                    }
                  ],
                  "text": "HbA1c"
                },
                "detailQuantity": {
                  "value": 7.0,
                  "comparator": "<",
                  "unit": "%",
                  "system": "http://unitsofmeasure.org",
                  "code": "%"
                }
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Goal/weight-goal-example",
          "resource": {
            "resourceType": "Goal",
            "id": "weight-goal-example",
            "lifecycleStatus": "active",
            "description": {
              "text": "Weight goal: gradual 5% reduction from baseline over six months."
            },
            "subject": {
              "reference": "Patient/careplan-example"
            },
            "target": [
              {
                "detailString": "5% reduction from baseline",
                "dueDate": "2027-02-11"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/CarePlan/diabetes-management-plan-example",
          "resource": {
            "resourceType": "CarePlan",
            "id": "diabetes-management-plan-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/dccm-diabetes-management-plan"
              ]
            },
            "status": "active",
            "intent": "plan",
            "category": [
              {
                "coding": [
                  {
                    "system": "https://example.org/fhir/CodeSystem/dccm-careplan-category",
                    "code": "diabetes-management",
                    "display": "Diabetes management"
                  }
                ],
                "text": "Diabetes management plan"
              }
            ],
            "title": "Individualized diabetes management plan",
            "subject": {
              "reference": "Patient/careplan-example"
            },
            "period": {
              "start": "2026-08-11",
              "end": "2027-02-11"
            },
            "addresses": [
              {
                "reference": "Condition/careplan-diabetes-condition"
              }
            ],
            "goal": [
              {
                "reference": "Goal/glycemic-goal-example",
                "display": "Glycemic Goals"
              },
              {
                "reference": "Goal/weight-goal-example",
                "display": "Weight Goals"
              }
            ],
            "activity": [
              {
                "detail": {
                  "kind": "ServiceRequest",
                  "code": {
                    "coding": [
                      {
                        "system": "https://example.org/fhir/CodeSystem/dccm-careplan-activity",
                        "code": "monitoring-plan",
                        "display": "Monitoring Plan"
                      }
                    ]
                  },
                  "status": "in-progress",
                  "scheduledTiming": {
                    "repeat": {
                      "frequency": 1,
                      "period": 3,
                      "periodUnit": "mo"
                    }
                  },
                  "description": "Review HbA1c at least every three months and review home glucose/CGM data as clinically indicated."
                }
              },
              {
                "detail": {
                  "kind": "MedicationRequest",
                  "code": {
                    "coding": [
                      {
                        "system": "https://example.org/fhir/CodeSystem/dccm-careplan-activity",
                        "code": "medication-plan",
                        "display": "Medication Plan"
                      }
                    ]
                  },
                  "status": "in-progress",
                  "goal": [
                    {
                      "reference": "Goal/glycemic-goal-example"
                    }
                  ],
                  "description": "Continue individualized glucose-lowering therapy; reassess efficacy, tolerance, hypoglycemia risk, and cardiorenal indications at follow-up."
                }
              },
              {
                "detail": {
                  "kind": "ServiceRequest",
                  "code": {
                    "coding": [
                      {
                        "system": "https://example.org/fhir/CodeSystem/dccm-careplan-activity",
                        "code": "lifestyle-plan",
                        "display": "Lifestyle Plan"
                      }
                    ]
                  },
                  "status": "in-progress",
                  "goal": [
                    {
                      "reference": "Goal/glycemic-goal-example"
                    },
                    {
                      "reference": "Goal/weight-goal-example"
                    }
                  ],
                  "description": "Individualized nutrition, physical activity, sleep, and behavioral goals with periodic review."
                }
              },
              {
                "detail": {
                  "kind": "Task",
                  "code": {
                    "coding": [
                      {
                        "system": "https://example.org/fhir/CodeSystem/dccm-careplan-activity",
                        "code": "hypoglycemia-safety-plan",
                        "display": "Hypoglycemia Safety Plan"
                      }
                    ]
                  },
                  "status": "in-progress",
                  "description": "Recognize and treat hypoglycemia promptly; maintain access to fast-acting carbohydrate and prescribed rescue therapy when indicated."
                }
              },
              {
                "detail": {
                  "kind": "Task",
                  "code": {
                    "coding": [
                      {
                        "system": "https://example.org/fhir/CodeSystem/dccm-careplan-activity",
                        "code": "sick-day-ketone-plan",
                        "display": "Sick-Day / Ketone Plan"
                      }
                    ]
                  },
                  "status": "in-progress",
                  "description": "During acute illness, intensify glucose monitoring, maintain hydration, follow medication instructions, and check ketones when clinically indicated."
                }
              },
              {
                "detail": {
                  "kind": "ServiceRequest",
                  "code": {
                    "coding": [
                      {
                        "system": "https://example.org/fhir/CodeSystem/dccm-careplan-activity",
                        "code": "referral-plan",
                        "display": "Referral Plan"
                      }
                    ]
                  },
                  "status": "scheduled",
                  "description": "Refer to diabetes education, nutrition, eye, kidney, foot, behavioral-health, or other services according to assessed need."
                }
              },
              {
                "detail": {
                  "kind": "Appointment",
                  "code": {
                    "coding": [
                      {
                        "system": "https://example.org/fhir/CodeSystem/dccm-careplan-activity",
                        "code": "follow-up-plan",
                        "display": "Follow-Up Plan"
                      }
                    ]
                  },
                  "status": "scheduled",
                  "scheduledPeriod": {
                    "start": "2026-11-01",
                    "end": "2026-11-30"
                  },
                  "description": "Follow-up within approximately three months, earlier if glycemia, treatment tolerance, or safety concerns require review."
                }
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Glycemic Goals and Weight Goals are Goal resources; Monitoring, Medication, Lifestyle, Hypoglycemia Safety, Sick-Day/Ketone, Referral, and Follow-Up plans are CarePlan activities."
              }
            ]
          }
        }
      ]
    }
  },
  "eyeHealthAssessment": {
    "title": "Eye Health Assessment",
    "resource": "DiagnosticReport",
    "baseUrl": "https://hl7.org/fhir/R4/diagnosticreport.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "dccm-eye-health-assessment",
      "url": "https://example.org/fhir/StructureDefinition/dccm-eye-health-assessment",
      "version": "0.1.0",
      "name": "EyeHealthAssessment",
      "title": "Eye Health Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Model",
      "description": "An mCODE-inspired FHIR R4 profile for a diabetes eye health assessment. DiagnosticReport is used as the assessment/report container, with atomic eye findings represented by linked Observation resources and DICOM eye imaging represented by linked ImagingStudy resources. ImagingStudy carries DICOM study, series, instance, laterality, and retrieval metadata rather than embedding the diagnostic pixel data itself.",
      "purpose": "Prototype only. It demonstrates how the Eye Health Assessment clinical-model box can be expressed using a constrained FHIR R4 DiagnosticReport while linking structured observations, ophthalmic imaging, a rendered key image, and follow-up planning.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "DiagnosticReport",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/DiagnosticReport",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "DiagnosticReport",
            "path": "DiagnosticReport"
          },
          {
            "id": "DiagnosticReport.basedOn",
            "path": "DiagnosticReport.basedOn",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.status",
            "path": "DiagnosticReport.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.code",
            "path": "DiagnosticReport.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.subject",
            "path": "DiagnosticReport.subject",
            "min": 1,
            "max": "1",
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "DiagnosticReport.effective[x]",
            "path": "DiagnosticReport.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.performer",
            "path": "DiagnosticReport.performer",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.resultsInterpreter",
            "path": "DiagnosticReport.resultsInterpreter",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.result",
            "path": "DiagnosticReport.result",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Observation"
                ]
              }
            ]
          },
          {
            "id": "DiagnosticReport.imagingStudy",
            "path": "DiagnosticReport.imagingStudy",
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/ImagingStudy"
                ]
              }
            ]
          },
          {
            "id": "DiagnosticReport.media",
            "path": "DiagnosticReport.media",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.conclusion",
            "path": "DiagnosticReport.conclusion",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.presentedForm",
            "path": "DiagnosticReport.presentedForm",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "eye-health-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-eye-example",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-eye-example",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Practitioner/ophthalmologist-example",
          "resource": {
            "resourceType": "Practitioner",
            "id": "ophthalmologist-example",
            "name": [
              {
                "family": "Rao",
                "given": [
                  "Mira"
                ],
                "prefix": [
                  "Dr"
                ]
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ServiceRequest/eye-exam-order",
          "resource": {
            "resourceType": "ServiceRequest",
            "id": "eye-exam-order",
            "status": "completed",
            "intent": "order",
            "priority": "routine",
            "code": {
              "text": "Diabetes eye examination with bilateral macular optical coherence tomography (OCT)"
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "authoredOn": "2026-08-01",
            "requester": {
              "reference": "Practitioner/ophthalmologist-example"
            },
            "note": [
              {
                "text": "Illustrative order/request fulfilled by the eye examination and OCT imaging study in this bundle."
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Endpoint/ophthalmology-dicomweb",
          "resource": {
            "resourceType": "Endpoint",
            "id": "ophthalmology-dicomweb",
            "status": "active",
            "connectionType": {
              "system": "http://terminology.hl7.org/CodeSystem/endpoint-connection-type",
              "code": "dicom-wado-rs",
              "display": "DICOM WADO-RS"
            },
            "name": "Illustrative ophthalmology DICOMweb endpoint",
            "payloadType": [
              {
                "text": "DICOM ophthalmic imaging"
              }
            ],
            "payloadMimeType": [
              "application/dicom"
            ],
            "address": "https://example.org/dicomweb"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ImagingStudy/retinal-oct-study",
          "resource": {
            "resourceType": "ImagingStudy",
            "id": "retinal-oct-study",
            "identifier": [
              {
                "system": "urn:dicom:uid",
                "value": "urn:oid:2.16.124.113543.1154777499.20260811.1"
              }
            ],
            "status": "available",
            "modality": [
              {
                "system": "http://dicom.nema.org/resources/ontology/DCM",
                "code": "OPT",
                "display": "Ophthalmic Tomography"
              }
            ],
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "started": "2026-08-11T08:40:00+05:30",
            "basedOn": [
              {
                "reference": "ServiceRequest/eye-exam-order"
              }
            ],
            "interpreter": [
              {
                "reference": "Practitioner/ophthalmologist-example"
              }
            ],
            "endpoint": [
              {
                "reference": "Endpoint/ophthalmology-dicomweb"
              }
            ],
            "numberOfSeries": 2,
            "numberOfInstances": 2,
            "description": "Bilateral macular optical coherence tomography (OCT)",
            "note": [
              {
                "text": "The diagnostic scan pixels are not embedded in this ImagingStudy resource. The DICOM study remains in the imaging archive and is retrievable through the referenced WADO-RS endpoint."
              }
            ],
            "series": [
              {
                "uid": "2.16.124.113543.1154777499.20260811.1.1",
                "number": 1,
                "modality": {
                  "system": "http://dicom.nema.org/resources/ontology/DCM",
                  "code": "OPT",
                  "display": "Ophthalmic Tomography"
                },
                "description": "Right-eye macular OCT",
                "numberOfInstances": 1,
                "endpoint": [
                  {
                    "reference": "Endpoint/ophthalmology-dicomweb"
                  }
                ],
                "bodySite": {
                  "text": "Retina"
                },
                "laterality": {
                  "system": "http://snomed.info/sct",
                  "code": "419465000",
                  "display": "Unilateral right"
                },
                "started": "2026-08-11T08:40:00+05:30",
                "instance": [
                  {
                    "uid": "2.16.124.113543.1154777499.20260811.1.1.1",
                    "sopClass": {
                      "system": "urn:ietf:rfc:3986",
                      "code": "urn:oid:1.2.840.10008.5.1.4.1.1.77.1.5.4",
                      "display": "Ophthalmic Tomography Image Storage"
                    },
                    "number": 1,
                    "title": "Right macular OCT volume"
                  }
                ]
              },
              {
                "uid": "2.16.124.113543.1154777499.20260811.1.2",
                "number": 2,
                "modality": {
                  "system": "http://dicom.nema.org/resources/ontology/DCM",
                  "code": "OPT",
                  "display": "Ophthalmic Tomography"
                },
                "description": "Left-eye macular OCT",
                "numberOfInstances": 1,
                "endpoint": [
                  {
                    "reference": "Endpoint/ophthalmology-dicomweb"
                  }
                ],
                "bodySite": {
                  "text": "Retina"
                },
                "laterality": {
                  "system": "http://snomed.info/sct",
                  "code": "419161000",
                  "display": "Unilateral left"
                },
                "started": "2026-08-11T08:42:00+05:30",
                "instance": [
                  {
                    "uid": "2.16.124.113543.1154777499.20260811.1.2.1",
                    "sopClass": {
                      "system": "urn:ietf:rfc:3986",
                      "code": "urn:oid:1.2.840.10008.5.1.4.1.1.77.1.5.4",
                      "display": "Ophthalmic Tomography Image Storage"
                    },
                    "number": 1,
                    "title": "Left macular OCT volume"
                  }
                ]
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/right-visual-acuity",
          "resource": {
            "resourceType": "Observation",
            "id": "right-visual-acuity",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "exam",
                    "display": "Exam"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "65893-0",
                  "display": "Visual acuity best corrected Right eye"
                }
              ]
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "effectiveDateTime": "2026-08-11T08:30:00+05:30",
            "performer": [
              {
                "reference": "Practitioner/ophthalmologist-example"
              }
            ],
            "method": {
              "text": "Best-corrected Snellen visual acuity"
            },
            "valueRatio": {
              "numerator": {
                "value": 20,
                "unit": "ft",
                "system": "http://unitsofmeasure.org",
                "code": "[ft_us]"
              },
              "denominator": {
                "value": 20,
                "unit": "ft",
                "system": "http://unitsofmeasure.org",
                "code": "[ft_us]"
              }
            },
            "note": [
              {
                "text": "Right-eye best-corrected visual acuity: 20/20."
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/left-visual-acuity",
          "resource": {
            "resourceType": "Observation",
            "id": "left-visual-acuity",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "exam",
                    "display": "Exam"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "65897-1",
                  "display": "Visual acuity best corrected Left eye"
                }
              ]
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "effectiveDateTime": "2026-08-11T08:30:00+05:30",
            "performer": [
              {
                "reference": "Practitioner/ophthalmologist-example"
              }
            ],
            "method": {
              "text": "Best-corrected Snellen visual acuity"
            },
            "valueRatio": {
              "numerator": {
                "value": 20,
                "unit": "ft",
                "system": "http://unitsofmeasure.org",
                "code": "[ft_us]"
              },
              "denominator": {
                "value": 25,
                "unit": "ft",
                "system": "http://unitsofmeasure.org",
                "code": "[ft_us]"
              }
            },
            "note": [
              {
                "text": "Left-eye best-corrected visual acuity: 20/25."
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/right-retinal-oct-finding",
          "resource": {
            "resourceType": "Observation",
            "id": "right-retinal-oct-finding",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "imaging",
                    "display": "Imaging"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "79818-1",
                  "display": "Study observation Right retina by OCT"
                }
              ]
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "effectiveDateTime": "2026-08-11T08:40:00+05:30",
            "performer": [
              {
                "reference": "Practitioner/ophthalmologist-example"
              }
            ],
            "method": {
              "text": "Optical coherence tomography (OCT)"
            },
            "bodySite": {
              "text": "Right retina"
            },
            "valueCodeableConcept": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "LA24809-8",
                  "display": "No abnormal findings"
                }
              ],
              "text": "No abnormal findings"
            },
            "derivedFrom": [
              {
                "reference": "ImagingStudy/retinal-oct-study"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/right-macular-thickness",
          "resource": {
            "resourceType": "Observation",
            "id": "right-macular-thickness",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "imaging",
                    "display": "Imaging"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "57108-3",
                  "display": "Macular grid.center point thickness by OCT"
                }
              ]
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "effectiveDateTime": "2026-08-11T08:40:00+05:30",
            "performer": [
              {
                "reference": "Practitioner/ophthalmologist-example"
              }
            ],
            "method": {
              "text": "Optical coherence tomography (OCT)"
            },
            "bodySite": {
              "text": "Right macula"
            },
            "valueQuantity": {
              "value": 258,
              "unit": "um",
              "system": "http://unitsofmeasure.org",
              "code": "um"
            },
            "derivedFrom": [
              {
                "reference": "ImagingStudy/retinal-oct-study"
              }
            ],
            "note": [
              {
                "text": "Illustrative quantitative macular OCT finding; no intraretinal or subretinal fluid described."
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Media/oct-key-image-right",
          "resource": {
            "resourceType": "Media",
            "id": "oct-key-image-right",
            "status": "completed",
            "type": {
              "text": "image"
            },
            "modality": {
              "coding": [
                {
                  "system": "http://dicom.nema.org/resources/ontology/DCM",
                  "code": "OPT",
                  "display": "Ophthalmic Tomography"
                }
              ]
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "createdDateTime": "2026-08-11T08:40:00+05:30",
            "operator": {
              "reference": "Practitioner/ophthalmologist-example"
            },
            "bodySite": {
              "text": "Right retina / macula"
            },
            "content": {
              "contentType": "image/jpeg",
              "url": "https://example.org/dicomweb/studies/2.16.124.113543.1154777499.20260811.1/series/2.16.124.113543.1154777499.20260811.1.1/instances/2.16.124.113543.1154777499.20260811.1.1.1/rendered",
              "title": "Rendered right-eye macular OCT key image"
            },
            "note": [
              {
                "text": "Illustrative rendered key image. The full diagnostic DICOM study is referenced separately by ImagingStudy."
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/DiagnosticReport/eye-health-assessment",
          "resource": {
            "resourceType": "DiagnosticReport",
            "id": "eye-health-assessment",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/dccm-eye-health-assessment"
              ]
            },
            "basedOn": [
              {
                "reference": "ServiceRequest/eye-exam-order"
              }
            ],
            "status": "final",
            "category": [
              {
                "text": "Ophthalmology"
              }
            ],
            "code": {
              "text": "Diabetes eye health assessment with bilateral macular OCT"
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "effectiveDateTime": "2026-08-11T08:30:00+05:30",
            "issued": "2026-08-11T09:05:00+05:30",
            "performer": [
              {
                "reference": "Practitioner/ophthalmologist-example"
              }
            ],
            "resultsInterpreter": [
              {
                "reference": "Practitioner/ophthalmologist-example"
              }
            ],
            "result": [
              {
                "reference": "Observation/right-visual-acuity"
              },
              {
                "reference": "Observation/left-visual-acuity"
              },
              {
                "reference": "Observation/right-retinal-oct-finding"
              },
              {
                "reference": "Observation/right-macular-thickness"
              }
            ],
            "imagingStudy": [
              {
                "reference": "ImagingStudy/retinal-oct-study"
              }
            ],
            "media": [
              {
                "comment": "Rendered key image from the right-eye macular OCT; full DICOM study is available through ImagingStudy.",
                "link": {
                  "reference": "Media/oct-key-image-right"
                }
              }
            ],
            "conclusion": "Best-corrected visual acuity is 20/20 right and 20/25 left. The illustrative OCT assessment records no abnormal right-retinal finding and a right macular center-point thickness of 258 um. Repeat diabetic eye examination in approximately 12 months unless clinically indicated sooner.",
            "presentedForm": [
              {
                "contentType": "application/pdf",
                "url": "https://example.org/reports/eye-health-assessment.pdf",
                "title": "Illustrative ophthalmology report"
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Exam Method is represented by the report code and Observation.method; Exam Date by DiagnosticReport.effectiveDateTime; Visual Acuity by right/left LOINC Observations; Retinal Findings and Macular Findings by OCT-derived Observations; Laterality by laterality-specific observations and ImagingStudy.series.laterality; Referral / Follow-Up by the linked ServiceRequest. The eye scan itself is represented by ImagingStudy plus a WADO-RS Endpoint, with an optional rendered key image represented by Media."
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ServiceRequest/eye-follow-up",
          "resource": {
            "resourceType": "ServiceRequest",
            "id": "eye-follow-up",
            "status": "active",
            "intent": "plan",
            "priority": "routine",
            "code": {
              "text": "Repeat diabetes eye examination with retinal imaging"
            },
            "subject": {
              "reference": "Patient/diabetes-eye-example"
            },
            "occurrencePeriod": {
              "start": "2027-08-01",
              "end": "2027-08-31"
            },
            "authoredOn": "2026-08-11",
            "requester": {
              "reference": "Practitioner/ophthalmologist-example"
            },
            "reasonReference": [
              {
                "reference": "DiagnosticReport/eye-health-assessment"
              }
            ],
            "note": [
              {
                "text": "Graph child mapping: Referral / Follow-Up."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesClassification": {
    "title": "Diabetes Classification",
    "resource": "ClinicalImpression",
    "baseUrl": "https://hl7.org/fhir/R4/clinicalimpression.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-classification",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-classification",
      "version": "0.2.0",
      "name": "DiabetesClassification",
      "title": "Diabetes Classification Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes classification within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ClinicalImpression",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ClinicalImpression",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ClinicalImpression",
            "path": "ClinicalImpression",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.status",
            "path": "ClinicalImpression.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.code",
            "path": "ClinicalImpression.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.description",
            "path": "ClinicalImpression.description",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.subject",
            "path": "ClinicalImpression.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ClinicalImpression.effective[x]",
            "path": "ClinicalImpression.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.date",
            "path": "ClinicalImpression.date",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.assessor",
            "path": "ClinicalImpression.assessor",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.problem",
            "path": "ClinicalImpression.problem",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.investigation",
            "path": "ClinicalImpression.investigation",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.summary",
            "path": "ClinicalImpression.summary",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.finding",
            "path": "ClinicalImpression.finding",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.supportingInfo",
            "path": "ClinicalImpression.supportingInfo",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.note",
            "path": "ClinicalImpression.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-classification-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-classification-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-classification-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-classification-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-classification-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-classification-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ClinicalImpression/diabetes-classification-example",
          "resource": {
            "resourceType": "ClinicalImpression",
            "id": "diabetes-classification-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-classification"
              ]
            },
            "status": "completed",
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-classification",
                  "display": "Diabetes Classification"
                }
              ],
              "text": "Diabetes Classification"
            },
            "description": "Clinical assessment supporting diabetes classification.",
            "subject": {
              "reference": "Patient/diabetes-classification-patient"
            },
            "problem": [
              {
                "reference": "Condition/diabetes-classification-example-diabetes"
              }
            ],
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "date": "2026-08-11T09:15:00+05:30",
            "summary": "Diabetes Classification: illustrative structured clinical impression.",
            "finding": [
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "diabetes-type",
                      "display": "Diabetes Type"
                    }
                  ],
                  "text": "Diabetes Type"
                },
                "basis": "Illustrative assessment of diabetes type."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "classification-certainty",
                      "display": "Classification Certainty"
                    }
                  ],
                  "text": "Classification Certainty"
                },
                "basis": "Illustrative assessment of classification certainty."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "clinical-phenotype",
                      "display": "Clinical Phenotype"
                    }
                  ],
                  "text": "Clinical Phenotype"
                },
                "basis": "Illustrative assessment of clinical phenotype."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Diabetes Type; Classification Certainty; Clinical Phenotype."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesDiagnosticAssessment": {
    "title": "Diabetes Diagnostic Assessment",
    "resource": "ClinicalImpression",
    "baseUrl": "https://hl7.org/fhir/R4/clinicalimpression.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-diagnostic-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-diagnostic-assessment",
      "version": "0.2.0",
      "name": "DiabetesDiagnosticAssessment",
      "title": "Diabetes Diagnostic Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes diagnostic assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ClinicalImpression",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ClinicalImpression",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ClinicalImpression",
            "path": "ClinicalImpression",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.status",
            "path": "ClinicalImpression.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.code",
            "path": "ClinicalImpression.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.description",
            "path": "ClinicalImpression.description",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.subject",
            "path": "ClinicalImpression.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ClinicalImpression.effective[x]",
            "path": "ClinicalImpression.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.date",
            "path": "ClinicalImpression.date",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.assessor",
            "path": "ClinicalImpression.assessor",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.problem",
            "path": "ClinicalImpression.problem",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.investigation",
            "path": "ClinicalImpression.investigation",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.summary",
            "path": "ClinicalImpression.summary",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.finding",
            "path": "ClinicalImpression.finding",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.supportingInfo",
            "path": "ClinicalImpression.supportingInfo",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.note",
            "path": "ClinicalImpression.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-diagnostic-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-diagnostic-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-diagnostic-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-diagnostic-assessment-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-diagnostic-assessment-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-diagnostic-assessment-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ClinicalImpression/diabetes-diagnostic-assessment-example",
          "resource": {
            "resourceType": "ClinicalImpression",
            "id": "diabetes-diagnostic-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-diagnostic-assessment"
              ]
            },
            "status": "completed",
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-diagnostic-assessment",
                  "display": "Diabetes Diagnostic Assessment"
                }
              ],
              "text": "Diabetes Diagnostic Assessment"
            },
            "description": "Clinical assessment supporting diabetes diagnostic assessment.",
            "subject": {
              "reference": "Patient/diabetes-diagnostic-assessment-patient"
            },
            "problem": [
              {
                "reference": "Condition/diabetes-diagnostic-assessment-example-diabetes"
              }
            ],
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "date": "2026-08-11T09:15:00+05:30",
            "summary": "Diabetes Diagnostic Assessment: illustrative structured clinical impression.",
            "finding": [
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "diagnostic-method",
                      "display": "Diagnostic Method"
                    }
                  ],
                  "text": "Diagnostic Method"
                },
                "basis": "Illustrative assessment of diagnostic method."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "assessment-date",
                      "display": "Assessment Date"
                    }
                  ],
                  "text": "Assessment Date"
                },
                "basis": "Illustrative assessment of assessment date."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "symptoms-clinical-context",
                      "display": "Symptoms / Clinical Context"
                    }
                  ],
                  "text": "Symptoms / Clinical Context"
                },
                "basis": "Illustrative assessment of symptoms / clinical context."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "confirmation-status",
                      "display": "Confirmation Status"
                    }
                  ],
                  "text": "Confirmation Status"
                },
                "basis": "Illustrative assessment of confirmation status."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "interpretation",
                      "display": "Interpretation"
                    }
                  ],
                  "text": "Interpretation"
                },
                "basis": "Illustrative assessment of interpretation."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Diagnostic Method; Assessment Date; Symptoms / Clinical Context; Confirmation Status; Interpretation."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesEtiologyAssessment": {
    "title": "Diabetes Etiology Assessment",
    "resource": "ClinicalImpression",
    "baseUrl": "https://hl7.org/fhir/R4/clinicalimpression.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-etiology-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-etiology-assessment",
      "version": "0.2.0",
      "name": "DiabetesEtiologyAssessment",
      "title": "Diabetes Etiology Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes etiology assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ClinicalImpression",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ClinicalImpression",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ClinicalImpression",
            "path": "ClinicalImpression",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.status",
            "path": "ClinicalImpression.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.code",
            "path": "ClinicalImpression.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.description",
            "path": "ClinicalImpression.description",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.subject",
            "path": "ClinicalImpression.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ClinicalImpression.effective[x]",
            "path": "ClinicalImpression.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.date",
            "path": "ClinicalImpression.date",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.assessor",
            "path": "ClinicalImpression.assessor",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.problem",
            "path": "ClinicalImpression.problem",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.investigation",
            "path": "ClinicalImpression.investigation",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.summary",
            "path": "ClinicalImpression.summary",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.finding",
            "path": "ClinicalImpression.finding",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.supportingInfo",
            "path": "ClinicalImpression.supportingInfo",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.note",
            "path": "ClinicalImpression.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-etiology-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-etiology-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-etiology-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-etiology-assessment-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-etiology-assessment-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-etiology-assessment-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ClinicalImpression/diabetes-etiology-assessment-example",
          "resource": {
            "resourceType": "ClinicalImpression",
            "id": "diabetes-etiology-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-etiology-assessment"
              ]
            },
            "status": "completed",
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-etiology-assessment",
                  "display": "Diabetes Etiology Assessment"
                }
              ],
              "text": "Diabetes Etiology Assessment"
            },
            "description": "Clinical assessment supporting diabetes etiology assessment.",
            "subject": {
              "reference": "Patient/diabetes-etiology-assessment-patient"
            },
            "problem": [
              {
                "reference": "Condition/diabetes-etiology-assessment-example-diabetes"
              }
            ],
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "date": "2026-08-11T09:15:00+05:30",
            "summary": "Diabetes Etiology Assessment: illustrative structured clinical impression.",
            "finding": [
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "autoimmune-evidence",
                      "display": "Autoimmune Evidence"
                    }
                  ],
                  "text": "Autoimmune Evidence"
                },
                "basis": "Illustrative assessment of autoimmune evidence."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "beta-cell-function",
                      "display": "Beta-Cell Function"
                    }
                  ],
                  "text": "Beta-Cell Function"
                },
                "basis": "Illustrative assessment of beta-cell function."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "genetic-evidence",
                      "display": "Genetic Evidence"
                    }
                  ],
                  "text": "Genetic Evidence"
                },
                "basis": "Illustrative assessment of genetic evidence."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "pancreatic-disease-injury",
                      "display": "Pancreatic Disease / Injury"
                    }
                  ],
                  "text": "Pancreatic Disease / Injury"
                },
                "basis": "Illustrative assessment of pancreatic disease / injury."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "medication-exposure",
                      "display": "Medication / Exposure"
                    }
                  ],
                  "text": "Medication / Exposure"
                },
                "basis": "Illustrative assessment of medication / exposure."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "insulin-resistance-phenotype",
                      "display": "Insulin Resistance / Phenotype"
                    }
                  ],
                  "text": "Insulin Resistance / Phenotype"
                },
                "basis": "Illustrative assessment of insulin resistance / phenotype."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Autoimmune Evidence; Beta-Cell Function; Genetic Evidence; Pancreatic Disease / Injury; Medication / Exposure; Insulin Resistance / Phenotype."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesDiseaseStateCourse": {
    "title": "Diabetes Disease State / Course",
    "resource": "ClinicalImpression",
    "baseUrl": "https://hl7.org/fhir/R4/clinicalimpression.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-disease-state-course",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-disease-state-course",
      "version": "0.2.0",
      "name": "DiabetesDiseaseStateCourse",
      "title": "Diabetes Disease State / Course Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes disease state / course within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ClinicalImpression",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ClinicalImpression",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ClinicalImpression",
            "path": "ClinicalImpression",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.status",
            "path": "ClinicalImpression.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.code",
            "path": "ClinicalImpression.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.description",
            "path": "ClinicalImpression.description",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.subject",
            "path": "ClinicalImpression.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ClinicalImpression.effective[x]",
            "path": "ClinicalImpression.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.date",
            "path": "ClinicalImpression.date",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.assessor",
            "path": "ClinicalImpression.assessor",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.problem",
            "path": "ClinicalImpression.problem",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.investigation",
            "path": "ClinicalImpression.investigation",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.summary",
            "path": "ClinicalImpression.summary",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.finding",
            "path": "ClinicalImpression.finding",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.supportingInfo",
            "path": "ClinicalImpression.supportingInfo",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.note",
            "path": "ClinicalImpression.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-disease-state-course-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-disease-state-course-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-disease-state-course-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-disease-state-course-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-disease-state-course-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-disease-state-course-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ClinicalImpression/diabetes-disease-state-course-example",
          "resource": {
            "resourceType": "ClinicalImpression",
            "id": "diabetes-disease-state-course-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-disease-state-course"
              ]
            },
            "status": "completed",
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-disease-state-course",
                  "display": "Diabetes Disease State / Course"
                }
              ],
              "text": "Diabetes Disease State / Course"
            },
            "description": "Clinical assessment supporting diabetes disease state / course.",
            "subject": {
              "reference": "Patient/diabetes-disease-state-course-patient"
            },
            "problem": [
              {
                "reference": "Condition/diabetes-disease-state-course-example-diabetes"
              }
            ],
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "date": "2026-08-11T09:15:00+05:30",
            "summary": "Diabetes Disease State / Course: illustrative structured clinical impression.",
            "finding": [
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "disease-state",
                      "display": "Disease State"
                    }
                  ],
                  "text": "Disease State"
                },
                "basis": "Illustrative assessment of disease state."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "disease-trajectory",
                      "display": "Disease Trajectory"
                    }
                  ],
                  "text": "Disease Trajectory"
                },
                "basis": "Illustrative assessment of disease trajectory."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "duration",
                      "display": "Duration"
                    }
                  ],
                  "text": "Duration"
                },
                "basis": "Illustrative assessment of duration."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "progression",
                      "display": "Progression"
                    }
                  ],
                  "text": "Progression"
                },
                "basis": "Illustrative assessment of progression."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "remission-recurrence",
                      "display": "Remission / Recurrence"
                    }
                  ],
                  "text": "Remission / Recurrence"
                },
                "basis": "Illustrative assessment of remission / recurrence."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "assessment-date",
                      "display": "Assessment Date"
                    }
                  ],
                  "text": "Assessment Date"
                },
                "basis": "Illustrative assessment of assessment date."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Disease State; Disease Trajectory; Duration; Progression; Remission / Recurrence; Assessment Date."
              }
            ]
          }
        }
      ]
    }
  },
  "type1DiabetesStage": {
    "title": "Type 1 Diabetes Stage",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-type-1-diabetes-stage",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-type-1-diabetes-stage",
      "version": "0.2.0",
      "name": "Type1DiabetesStage",
      "title": "Type 1 Diabetes Stage Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing type 1 diabetes stage within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "type-1-diabetes-stage-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/type-1-diabetes-stage-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "type-1-diabetes-stage-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/type-1-diabetes-stage-example",
          "resource": {
            "resourceType": "Observation",
            "id": "type-1-diabetes-stage-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-type-1-diabetes-stage"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "type-1-diabetes-stage",
                  "display": "Type 1 Diabetes Stage"
                }
              ],
              "text": "Type 1 Diabetes Stage"
            },
            "subject": {
              "reference": "Patient/type-1-diabetes-stage-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stage",
                      "display": "Stage"
                    }
                  ],
                  "text": "Stage"
                },
                "valueString": "Illustrative stage value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "islet-autoantibody-status",
                      "display": "Islet Autoantibody Status"
                    }
                  ],
                  "text": "Islet Autoantibody Status"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "glycemic-state",
                      "display": "Glycemic State"
                    }
                  ],
                  "text": "Glycemic State"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "symptoms",
                      "display": "Symptoms"
                    }
                  ],
                  "text": "Symptoms"
                },
                "valueString": "Illustrative symptoms value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stage-date",
                      "display": "Stage Date"
                    }
                  ],
                  "text": "Stage Date"
                },
                "valueString": "2026-08-11"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "prediabetesHighRiskGlycemia": {
    "title": "Prediabetes / High-Risk Glycemia",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-prediabetes-high-risk-glycemia",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-prediabetes-high-risk-glycemia",
      "version": "0.2.0",
      "name": "PrediabetesHighRiskGlycemia",
      "title": "Prediabetes / High-Risk Glycemia Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing prediabetes / high-risk glycemia within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "prediabetes-high-risk-glycemia-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/prediabetes-high-risk-glycemia-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "prediabetes-high-risk-glycemia-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/prediabetes-high-risk-glycemia-example",
          "resource": {
            "resourceType": "Condition",
            "id": "prediabetes-high-risk-glycemia-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-prediabetes-high-risk-glycemia"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "prediabetes-high-risk-glycemia",
                  "display": "Prediabetes / High-Risk Glycemia"
                }
              ],
              "text": "Prediabetes / High-Risk Glycemia"
            },
            "subject": {
              "reference": "Patient/prediabetes-high-risk-glycemia-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Diagnostic Criteria; Assessment Date; Progression Risk; Trajectory; Current Status. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "kidneyDiseaseInDiabetes": {
    "title": "Kidney Disease in Diabetes",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-kidney-disease-in-diabetes",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-kidney-disease-in-diabetes",
      "version": "0.2.0",
      "name": "KidneyDiseaseInDiabetes",
      "title": "Kidney Disease in Diabetes Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing kidney disease in diabetes within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "kidney-disease-in-diabetes-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/kidney-disease-in-diabetes-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "kidney-disease-in-diabetes-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/kidney-disease-in-diabetes-example",
          "resource": {
            "resourceType": "Condition",
            "id": "kidney-disease-in-diabetes-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-kidney-disease-in-diabetes"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "kidney-disease-in-diabetes",
                  "display": "Kidney Disease in Diabetes"
                }
              ],
              "text": "Kidney Disease in Diabetes"
            },
            "subject": {
              "reference": "Patient/kidney-disease-in-diabetes-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: CKD Status; GFR Category; Albuminuria Category; Progression; Kidney Failure; Kidney Replacement Therapy; Etiology / Attribution. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "diabeticRetinopathy": {
    "title": "Diabetic Retinopathy",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetic-retinopathy",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetic-retinopathy",
      "version": "0.2.0",
      "name": "DiabeticRetinopathy",
      "title": "Diabetic Retinopathy Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetic retinopathy within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetic-retinopathy-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetic-retinopathy-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetic-retinopathy-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetic-retinopathy-example",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetic-retinopathy-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetic-retinopathy"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetic-retinopathy",
                  "display": "Diabetic Retinopathy"
                }
              ],
              "text": "Diabetic Retinopathy"
            },
            "subject": {
              "reference": "Patient/diabetic-retinopathy-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Retinopathy Type; Severity / Stage; Laterality; Macular Edema; Vision-Threatening Status; Treatment Status. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "diabeticNeuropathy": {
    "title": "Diabetic Neuropathy",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetic-neuropathy",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetic-neuropathy",
      "version": "0.2.0",
      "name": "DiabeticNeuropathy",
      "title": "Diabetic Neuropathy Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetic neuropathy within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetic-neuropathy-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetic-neuropathy-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetic-neuropathy-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetic-neuropathy-example",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetic-neuropathy-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetic-neuropathy"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetic-neuropathy",
                  "display": "Diabetic Neuropathy"
                }
              ],
              "text": "Diabetic Neuropathy"
            },
            "subject": {
              "reference": "Patient/diabetic-neuropathy-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Neuropathy Type; Body Site; Symptoms; Severity; Loss of Protective Sensation; Associated Complication. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesRelatedFootDisease": {
    "title": "Diabetes-Related Foot Disease",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-related-foot-disease",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-related-foot-disease",
      "version": "0.2.0",
      "name": "DiabetesRelatedFootDisease",
      "title": "Diabetes-Related Foot Disease Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes-related foot disease within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-related-foot-disease-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-related-foot-disease-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-related-foot-disease-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-related-foot-disease-example",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-related-foot-disease-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-related-foot-disease"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-related-foot-disease",
                  "display": "Diabetes-Related Foot Disease"
                }
              ],
              "text": "Diabetes-Related Foot Disease"
            },
            "subject": {
              "reference": "Patient/diabetes-related-foot-disease-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Ulcer; Infection; Ischemia / PAD; Charcot Neuroarthropathy; Amputation; Laterality; Location; Severity; Healing Status. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "hypoglycemiaRiskAssessment": {
    "title": "Hypoglycemia Risk Assessment",
    "resource": "RiskAssessment",
    "baseUrl": "https://hl7.org/fhir/R4/riskassessment.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-hypoglycemia-risk-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-hypoglycemia-risk-assessment",
      "version": "0.2.0",
      "name": "HypoglycemiaRiskAssessment",
      "title": "Hypoglycemia Risk Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing hypoglycemia risk assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "RiskAssessment",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/RiskAssessment",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "RiskAssessment",
            "path": "RiskAssessment",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.status",
            "path": "RiskAssessment.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.method",
            "path": "RiskAssessment.method",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.code",
            "path": "RiskAssessment.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.subject",
            "path": "RiskAssessment.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "RiskAssessment.occurrence[x]",
            "path": "RiskAssessment.occurrence[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.condition",
            "path": "RiskAssessment.condition",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.performer",
            "path": "RiskAssessment.performer",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.reasonCode",
            "path": "RiskAssessment.reasonCode",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.basis",
            "path": "RiskAssessment.basis",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction",
            "path": "RiskAssessment.prediction",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.outcome",
            "path": "RiskAssessment.prediction.outcome",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.probability[x]",
            "path": "RiskAssessment.prediction.probability[x]",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.qualitativeRisk",
            "path": "RiskAssessment.prediction.qualitativeRisk",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.note",
            "path": "RiskAssessment.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "hypoglycemia-risk-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/hypoglycemia-risk-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "hypoglycemia-risk-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/hypoglycemia-risk-assessment-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "hypoglycemia-risk-assessment-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/hypoglycemia-risk-assessment-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/RiskAssessment/hypoglycemia-risk-assessment-example",
          "resource": {
            "resourceType": "RiskAssessment",
            "id": "hypoglycemia-risk-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-hypoglycemia-risk-assessment"
              ]
            },
            "status": "final",
            "method": {
              "text": "Clinician assessment using documented diabetes risk factors"
            },
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "hypoglycemia-risk-assessment",
                  "display": "Hypoglycemia Risk Assessment"
                }
              ],
              "text": "Hypoglycemia Risk Assessment"
            },
            "subject": {
              "reference": "Patient/hypoglycemia-risk-assessment-patient"
            },
            "condition": {
              "reference": "Condition/hypoglycemia-risk-assessment-example-diabetes"
            },
            "occurrenceDateTime": "2026-08-11T09:00:00+05:30",
            "prediction": [
              {
                "outcome": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "hypoglycemia-risk-assessment-outcome",
                      "display": "Clinically significant hypoglycemia risk assessment outcome"
                    }
                  ],
                  "text": "Clinically significant hypoglycemia risk assessment outcome"
                },
                "qualitativeRisk": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "moderate",
                      "display": "Moderate risk"
                    }
                  ],
                  "text": "Moderate risk"
                },
                "whenPeriod": {
                  "start": "2026-08-11",
                  "end": "2027-08-11"
                }
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Prior Hypoglycemia; Hypoglycemia Awareness; Medication-Related Risk; Kidney / Liver Risk; Cognitive / Functional Risk; Food / Social Risk; Rescue Preparedness; Overall Risk. Probability is intentionally qualitative in this prototype."
              }
            ]
          }
        }
      ]
    }
  },
  "kidneyHealthAssessment": {
    "title": "Kidney Health Assessment",
    "resource": "DiagnosticReport",
    "baseUrl": "https://hl7.org/fhir/R4/diagnosticreport.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-kidney-health-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-kidney-health-assessment",
      "version": "0.2.0",
      "name": "KidneyHealthAssessment",
      "title": "Kidney Health Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing kidney health assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "DiagnosticReport",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/DiagnosticReport",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "DiagnosticReport",
            "path": "DiagnosticReport",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.basedOn",
            "path": "DiagnosticReport.basedOn",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.status",
            "path": "DiagnosticReport.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.category",
            "path": "DiagnosticReport.category",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.code",
            "path": "DiagnosticReport.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.subject",
            "path": "DiagnosticReport.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "DiagnosticReport.effective[x]",
            "path": "DiagnosticReport.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.issued",
            "path": "DiagnosticReport.issued",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.performer",
            "path": "DiagnosticReport.performer",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.resultsInterpreter",
            "path": "DiagnosticReport.resultsInterpreter",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.result",
            "path": "DiagnosticReport.result",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Observation"
                ]
              }
            ]
          },
          {
            "id": "DiagnosticReport.conclusion",
            "path": "DiagnosticReport.conclusion",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.presentedForm",
            "path": "DiagnosticReport.presentedForm",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "kidney-health-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/kidney-health-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "kidney-health-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/kidney-health-assessment-example-result-1",
          "resource": {
            "resourceType": "Observation",
            "id": "kidney-health-assessment-example-result-1",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "serum-creatinine",
                  "display": "Serum Creatinine"
                }
              ],
              "text": "Serum Creatinine"
            },
            "subject": {
              "reference": "Patient/kidney-health-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative serum creatinine value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/kidney-health-assessment-example-result-2",
          "resource": {
            "resourceType": "Observation",
            "id": "kidney-health-assessment-example-result-2",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "egfr",
                  "display": "eGFR"
                }
              ],
              "text": "eGFR"
            },
            "subject": {
              "reference": "Patient/kidney-health-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueQuantity": {
              "value": 82,
              "unit": "mL/min/1.73 m2",
              "system": "http://unitsofmeasure.org",
              "code": "mL/min/{1.73_m2}"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/kidney-health-assessment-example-result-3",
          "resource": {
            "resourceType": "Observation",
            "id": "kidney-health-assessment-example-result-3",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "urine-albumin-to-creatinine-ratio",
                  "display": "Urine Albumin-to-Creatinine Ratio"
                }
              ],
              "text": "Urine Albumin-to-Creatinine Ratio"
            },
            "subject": {
              "reference": "Patient/kidney-health-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueQuantity": {
              "value": 24,
              "unit": "mg/g",
              "system": "http://unitsofmeasure.org",
              "code": "mg/g"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/kidney-health-assessment-example-result-4",
          "resource": {
            "resourceType": "Observation",
            "id": "kidney-health-assessment-example-result-4",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "gfr-category",
                  "display": "GFR Category"
                }
              ],
              "text": "GFR Category"
            },
            "subject": {
              "reference": "Patient/kidney-health-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative gfr category value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/kidney-health-assessment-example-result-5",
          "resource": {
            "resourceType": "Observation",
            "id": "kidney-health-assessment-example-result-5",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "albuminuria-category",
                  "display": "Albuminuria Category"
                }
              ],
              "text": "Albuminuria Category"
            },
            "subject": {
              "reference": "Patient/kidney-health-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueQuantity": {
              "value": 24,
              "unit": "mg/g",
              "system": "http://unitsofmeasure.org",
              "code": "mg/g"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/kidney-health-assessment-example-result-6",
          "resource": {
            "resourceType": "Observation",
            "id": "kidney-health-assessment-example-result-6",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "kidney-function-trend",
                  "display": "Kidney Function Trend"
                }
              ],
              "text": "Kidney Function Trend"
            },
            "subject": {
              "reference": "Patient/kidney-health-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative kidney function trend value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/DiagnosticReport/kidney-health-assessment-example",
          "resource": {
            "resourceType": "DiagnosticReport",
            "id": "kidney-health-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-kidney-health-assessment"
              ]
            },
            "status": "final",
            "category": [
              {
                "text": "Diabetes assessment"
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "kidney-health-assessment",
                  "display": "Kidney Health Assessment"
                }
              ],
              "text": "Kidney Health Assessment"
            },
            "subject": {
              "reference": "Patient/kidney-health-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "issued": "2026-08-11T09:10:00+05:30",
            "result": [
              {
                "reference": "Observation/kidney-health-assessment-example-result-1"
              },
              {
                "reference": "Observation/kidney-health-assessment-example-result-2"
              },
              {
                "reference": "Observation/kidney-health-assessment-example-result-3"
              },
              {
                "reference": "Observation/kidney-health-assessment-example-result-4"
              },
              {
                "reference": "Observation/kidney-health-assessment-example-result-5"
              },
              {
                "reference": "Observation/kidney-health-assessment-example-result-6"
              }
            ],
            "conclusion": "Illustrative kidney health assessment summary; interpret in clinical context."
          }
        }
      ]
    }
  },
  "neuropathyAssessment": {
    "title": "Neuropathy Assessment",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-neuropathy-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-neuropathy-assessment",
      "version": "0.2.0",
      "name": "NeuropathyAssessment",
      "title": "Neuropathy Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing neuropathy assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "neuropathy-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/neuropathy-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "neuropathy-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/neuropathy-assessment-example",
          "resource": {
            "resourceType": "Observation",
            "id": "neuropathy-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-neuropathy-assessment"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "neuropathy-assessment",
                  "display": "Neuropathy Assessment"
                }
              ],
              "text": "Neuropathy Assessment"
            },
            "subject": {
              "reference": "Patient/neuropathy-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "neuropathic-symptoms",
                      "display": "Neuropathic Symptoms"
                    }
                  ],
                  "text": "Neuropathic Symptoms"
                },
                "valueString": "Illustrative neuropathic symptoms value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "monofilament",
                      "display": "Monofilament"
                    }
                  ],
                  "text": "Monofilament"
                },
                "valueString": "Illustrative monofilament value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "vibration",
                      "display": "Vibration"
                    }
                  ],
                  "text": "Vibration"
                },
                "valueString": "Illustrative vibration value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "reflexes",
                      "display": "Reflexes"
                    }
                  ],
                  "text": "Reflexes"
                },
                "valueString": "Illustrative reflexes value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "other-sensory-testing",
                      "display": "Other Sensory Testing"
                    }
                  ],
                  "text": "Other Sensory Testing"
                },
                "valueString": "Illustrative other sensory testing value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "autonomic-findings",
                      "display": "Autonomic Findings"
                    }
                  ],
                  "text": "Autonomic Findings"
                },
                "valueString": "Illustrative autonomic findings value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "assessment-date",
                      "display": "Assessment Date"
                    }
                  ],
                  "text": "Assessment Date"
                },
                "valueString": "2026-08-11"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "footRiskAssessment": {
    "title": "Foot Risk Assessment",
    "resource": "RiskAssessment",
    "baseUrl": "https://hl7.org/fhir/R4/riskassessment.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-foot-risk-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-foot-risk-assessment",
      "version": "0.2.0",
      "name": "FootRiskAssessment",
      "title": "Foot Risk Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing foot risk assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "RiskAssessment",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/RiskAssessment",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "RiskAssessment",
            "path": "RiskAssessment",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.status",
            "path": "RiskAssessment.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.method",
            "path": "RiskAssessment.method",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.code",
            "path": "RiskAssessment.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.subject",
            "path": "RiskAssessment.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "RiskAssessment.occurrence[x]",
            "path": "RiskAssessment.occurrence[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.condition",
            "path": "RiskAssessment.condition",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.performer",
            "path": "RiskAssessment.performer",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.reasonCode",
            "path": "RiskAssessment.reasonCode",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.basis",
            "path": "RiskAssessment.basis",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction",
            "path": "RiskAssessment.prediction",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.outcome",
            "path": "RiskAssessment.prediction.outcome",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.probability[x]",
            "path": "RiskAssessment.prediction.probability[x]",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.qualitativeRisk",
            "path": "RiskAssessment.prediction.qualitativeRisk",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.note",
            "path": "RiskAssessment.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "foot-risk-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/foot-risk-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "foot-risk-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/foot-risk-assessment-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "foot-risk-assessment-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/foot-risk-assessment-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/RiskAssessment/foot-risk-assessment-example",
          "resource": {
            "resourceType": "RiskAssessment",
            "id": "foot-risk-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-foot-risk-assessment"
              ]
            },
            "status": "final",
            "method": {
              "text": "Clinician assessment using documented diabetes risk factors"
            },
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "foot-risk-assessment",
                  "display": "Foot Risk Assessment"
                }
              ],
              "text": "Foot Risk Assessment"
            },
            "subject": {
              "reference": "Patient/foot-risk-assessment-patient"
            },
            "condition": {
              "reference": "Condition/foot-risk-assessment-example-diabetes"
            },
            "occurrenceDateTime": "2026-08-11T09:00:00+05:30",
            "prediction": [
              {
                "outcome": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "foot-risk-assessment-outcome",
                      "display": "Clinically significant foot risk assessment outcome"
                    }
                  ],
                  "text": "Clinically significant foot risk assessment outcome"
                },
                "qualitativeRisk": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "moderate",
                      "display": "Moderate risk"
                    }
                  ],
                  "text": "Moderate risk"
                },
                "whenPeriod": {
                  "start": "2026-08-11",
                  "end": "2027-08-11"
                }
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Skin Integrity; Deformity; Protective Sensation; Pedal Pulses / Perfusion; Prior Ulcer; Prior Amputation; Foot Risk Category; Recommended Follow-Up. Probability is intentionally qualitative in this prototype."
              }
            ]
          }
        }
      ]
    }
  },
  "cardiovascularCardiorenalRiskAssessment": {
    "title": "Cardiovascular / Cardiorenal Risk Assessment",
    "resource": "RiskAssessment",
    "baseUrl": "https://hl7.org/fhir/R4/riskassessment.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-cardiovascular-cardiorenal-risk-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-cardiovascular-cardiorenal-risk-assessment",
      "version": "0.2.0",
      "name": "CardiovascularCardiorenalRiskAssessment",
      "title": "Cardiovascular / Cardiorenal Risk Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing cardiovascular / cardiorenal risk assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "RiskAssessment",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/RiskAssessment",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "RiskAssessment",
            "path": "RiskAssessment",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.status",
            "path": "RiskAssessment.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.method",
            "path": "RiskAssessment.method",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.code",
            "path": "RiskAssessment.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.subject",
            "path": "RiskAssessment.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "RiskAssessment.occurrence[x]",
            "path": "RiskAssessment.occurrence[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.condition",
            "path": "RiskAssessment.condition",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.performer",
            "path": "RiskAssessment.performer",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.reasonCode",
            "path": "RiskAssessment.reasonCode",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.basis",
            "path": "RiskAssessment.basis",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction",
            "path": "RiskAssessment.prediction",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.outcome",
            "path": "RiskAssessment.prediction.outcome",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.probability[x]",
            "path": "RiskAssessment.prediction.probability[x]",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.prediction.qualitativeRisk",
            "path": "RiskAssessment.prediction.qualitativeRisk",
            "mustSupport": true
          },
          {
            "id": "RiskAssessment.note",
            "path": "RiskAssessment.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "cardiovascular-cardiorenal-risk-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/cardiovascular-cardiorenal-risk-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "cardiovascular-cardiorenal-risk-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/cardiovascular-cardiorenal-risk-assessment-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "cardiovascular-cardiorenal-risk-assessment-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/cardiovascular-cardiorenal-risk-assessment-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/RiskAssessment/cardiovascular-cardiorenal-risk-assessment-example",
          "resource": {
            "resourceType": "RiskAssessment",
            "id": "cardiovascular-cardiorenal-risk-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-cardiovascular-cardiorenal-risk-assessment"
              ]
            },
            "status": "final",
            "method": {
              "text": "Clinician assessment using documented diabetes risk factors"
            },
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "cardiovascular-cardiorenal-risk-assessment",
                  "display": "Cardiovascular / Cardiorenal Risk Assessment"
                }
              ],
              "text": "Cardiovascular / Cardiorenal Risk Assessment"
            },
            "subject": {
              "reference": "Patient/cardiovascular-cardiorenal-risk-assessment-patient"
            },
            "condition": {
              "reference": "Condition/cardiovascular-cardiorenal-risk-assessment-example-diabetes"
            },
            "occurrenceDateTime": "2026-08-11T09:00:00+05:30",
            "prediction": [
              {
                "outcome": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "cardiovascular-cardiorenal-risk-assessment-outcome",
                      "display": "Clinically significant cardiovascular / cardiorenal risk assessment outcome"
                    }
                  ],
                  "text": "Clinically significant cardiovascular / cardiorenal risk assessment outcome"
                },
                "qualitativeRisk": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "moderate",
                      "display": "Moderate risk"
                    }
                  ],
                  "text": "Moderate risk"
                },
                "whenPeriod": {
                  "start": "2026-08-11",
                  "end": "2027-08-11"
                }
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Blood Pressure; Lipids; Tobacco Exposure; ASCVD History; Heart Failure; Kidney Disease; Calculated / Clinical Risk; Assessment Date. Probability is intentionally qualitative in this prototype."
              }
            ]
          }
        }
      ]
    }
  },
  "weightAdiposityAssessment": {
    "title": "Weight & Adiposity Assessment",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-weight-adiposity-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-weight-adiposity-assessment",
      "version": "0.2.0",
      "name": "WeightAdiposityAssessment",
      "title": "Weight & Adiposity Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing weight & adiposity assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "weight-adiposity-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/weight-adiposity-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "weight-adiposity-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/weight-adiposity-assessment-example",
          "resource": {
            "resourceType": "Observation",
            "id": "weight-adiposity-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-weight-adiposity-assessment"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "weight-adiposity-assessment",
                  "display": "Weight & Adiposity Assessment"
                }
              ],
              "text": "Weight & Adiposity Assessment"
            },
            "subject": {
              "reference": "Patient/weight-adiposity-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "weight",
                      "display": "Weight"
                    }
                  ],
                  "text": "Weight"
                },
                "valueQuantity": {
                  "value": 78.4,
                  "unit": "kg",
                  "system": "http://unitsofmeasure.org",
                  "code": "kg"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "bmi",
                      "display": "BMI"
                    }
                  ],
                  "text": "BMI"
                },
                "valueQuantity": {
                  "value": 28.7,
                  "unit": "kg/m2",
                  "system": "http://unitsofmeasure.org",
                  "code": "kg/m2"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "waist-circumference",
                      "display": "Waist Circumference"
                    }
                  ],
                  "text": "Waist Circumference"
                },
                "valueString": "Illustrative waist circumference value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "weight-trajectory",
                      "display": "Weight Trajectory"
                    }
                  ],
                  "text": "Weight Trajectory"
                },
                "valueQuantity": {
                  "value": 78.4,
                  "unit": "kg",
                  "system": "http://unitsofmeasure.org",
                  "code": "kg"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "weight-goal",
                      "display": "Weight Goal"
                    }
                  ],
                  "text": "Weight Goal"
                },
                "valueQuantity": {
                  "value": 78.4,
                  "unit": "kg",
                  "system": "http://unitsofmeasure.org",
                  "code": "kg"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "clinical-significance",
                      "display": "Clinical Significance"
                    }
                  ],
                  "text": "Clinical Significance"
                },
                "valueString": "Illustrative clinical significance value"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "comorbidityAssessment": {
    "title": "Comorbidity Assessment",
    "resource": "ClinicalImpression",
    "baseUrl": "https://hl7.org/fhir/R4/clinicalimpression.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-comorbidity-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-comorbidity-assessment",
      "version": "0.2.0",
      "name": "ComorbidityAssessment",
      "title": "Comorbidity Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing comorbidity assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ClinicalImpression",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ClinicalImpression",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ClinicalImpression",
            "path": "ClinicalImpression",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.status",
            "path": "ClinicalImpression.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.code",
            "path": "ClinicalImpression.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.description",
            "path": "ClinicalImpression.description",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.subject",
            "path": "ClinicalImpression.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ClinicalImpression.effective[x]",
            "path": "ClinicalImpression.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.date",
            "path": "ClinicalImpression.date",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.assessor",
            "path": "ClinicalImpression.assessor",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.problem",
            "path": "ClinicalImpression.problem",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.investigation",
            "path": "ClinicalImpression.investigation",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.summary",
            "path": "ClinicalImpression.summary",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.finding",
            "path": "ClinicalImpression.finding",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.supportingInfo",
            "path": "ClinicalImpression.supportingInfo",
            "mustSupport": true
          },
          {
            "id": "ClinicalImpression.note",
            "path": "ClinicalImpression.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "comorbidity-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/comorbidity-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "comorbidity-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/comorbidity-assessment-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "comorbidity-assessment-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/comorbidity-assessment-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ClinicalImpression/comorbidity-assessment-example",
          "resource": {
            "resourceType": "ClinicalImpression",
            "id": "comorbidity-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-comorbidity-assessment"
              ]
            },
            "status": "completed",
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "comorbidity-assessment",
                  "display": "Comorbidity Assessment"
                }
              ],
              "text": "Comorbidity Assessment"
            },
            "description": "Clinical assessment supporting comorbidity assessment.",
            "subject": {
              "reference": "Patient/comorbidity-assessment-patient"
            },
            "problem": [
              {
                "reference": "Condition/comorbidity-assessment-example-diabetes"
              }
            ],
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "date": "2026-08-11T09:15:00+05:30",
            "summary": "Comorbidity Assessment: illustrative structured clinical impression.",
            "finding": [
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "condition-present",
                      "display": "Condition Present"
                    }
                  ],
                  "text": "Condition Present"
                },
                "basis": "Illustrative assessment of condition present."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "condition-absent",
                      "display": "Condition Absent"
                    }
                  ],
                  "text": "Condition Absent"
                },
                "basis": "Illustrative assessment of condition absent."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "condition-status",
                      "display": "Condition Status"
                    }
                  ],
                  "text": "Condition Status"
                },
                "basis": "Illustrative assessment of condition status."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "clinical-relevance",
                      "display": "Clinical Relevance"
                    }
                  ],
                  "text": "Clinical Relevance"
                },
                "basis": "Illustrative assessment of clinical relevance."
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "assessment-method",
                      "display": "Assessment Method"
                    }
                  ],
                  "text": "Assessment Method"
                },
                "basis": "Illustrative assessment of assessment method."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Condition Present; Condition Absent; Condition Status; Clinical Relevance; Assessment Method."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesSelfManagementAssessment": {
    "title": "Diabetes Self-Management Assessment",
    "resource": "QuestionnaireResponse",
    "baseUrl": "https://hl7.org/fhir/R4/questionnaireresponse.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-self-management-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-self-management-assessment",
      "version": "0.2.0",
      "name": "DiabetesSelfManagementAssessment",
      "title": "Diabetes Self-Management Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes self-management assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "QuestionnaireResponse",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "QuestionnaireResponse",
            "path": "QuestionnaireResponse",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.questionnaire",
            "path": "QuestionnaireResponse.questionnaire",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.status",
            "path": "QuestionnaireResponse.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.subject",
            "path": "QuestionnaireResponse.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "QuestionnaireResponse.encounter",
            "path": "QuestionnaireResponse.encounter",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.authored",
            "path": "QuestionnaireResponse.authored",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.author",
            "path": "QuestionnaireResponse.author",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.source",
            "path": "QuestionnaireResponse.source",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item",
            "path": "QuestionnaireResponse.item",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.linkId",
            "path": "QuestionnaireResponse.item.linkId",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.text",
            "path": "QuestionnaireResponse.item.text",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer",
            "path": "QuestionnaireResponse.item.answer",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer.value[x]",
            "path": "QuestionnaireResponse.item.answer.value[x]",
            "min": 1,
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-self-management-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-self-management-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-self-management-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Questionnaire/diabetes-self-management-assessment-example-form",
          "resource": {
            "resourceType": "Questionnaire",
            "id": "diabetes-self-management-assessment-example-form",
            "url": "https://example.org/fhir/Questionnaire/diabetes-self-management-assessment-example-form",
            "status": "active",
            "title": "Diabetes Self-Management Assessment Questionnaire",
            "subjectType": [
              "Patient"
            ],
            "item": [
              {
                "linkId": "q1",
                "text": "Medication-Taking",
                "type": "string"
              },
              {
                "linkId": "q2",
                "text": "Glucose Monitoring",
                "type": "string"
              },
              {
                "linkId": "q3",
                "text": "Nutrition Skills",
                "type": "string"
              },
              {
                "linkId": "q4",
                "text": "Physical Activity",
                "type": "string"
              },
              {
                "linkId": "q5",
                "text": "Insulin Skills",
                "type": "string"
              },
              {
                "linkId": "q6",
                "text": "Device Skills",
                "type": "string"
              },
              {
                "linkId": "q7",
                "text": "Hypoglycemia Skills",
                "type": "string"
              },
              {
                "linkId": "q8",
                "text": "Sick-Day / Ketone Skills",
                "type": "string"
              },
              {
                "linkId": "q9",
                "text": "DSMES Need",
                "type": "string"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/QuestionnaireResponse/diabetes-self-management-assessment-example",
          "resource": {
            "resourceType": "QuestionnaireResponse",
            "id": "diabetes-self-management-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-self-management-assessment"
              ]
            },
            "questionnaire": "https://example.org/fhir/Questionnaire/diabetes-self-management-assessment-example-form",
            "status": "completed",
            "subject": {
              "reference": "Patient/diabetes-self-management-assessment-patient"
            },
            "authored": "2026-08-11T09:00:00+05:30",
            "source": {
              "reference": "Patient/diabetes-self-management-assessment-patient"
            },
            "item": [
              {
                "linkId": "q1",
                "text": "Medication-Taking",
                "answer": [
                  {
                    "valueString": "Illustrative response for medication-taking"
                  }
                ]
              },
              {
                "linkId": "q2",
                "text": "Glucose Monitoring",
                "answer": [
                  {
                    "valueString": "Illustrative response for glucose monitoring"
                  }
                ]
              },
              {
                "linkId": "q3",
                "text": "Nutrition Skills",
                "answer": [
                  {
                    "valueString": "Illustrative response for nutrition skills"
                  }
                ]
              },
              {
                "linkId": "q4",
                "text": "Physical Activity",
                "answer": [
                  {
                    "valueString": "Illustrative response for physical activity"
                  }
                ]
              },
              {
                "linkId": "q5",
                "text": "Insulin Skills",
                "answer": [
                  {
                    "valueString": "Illustrative response for insulin skills"
                  }
                ]
              },
              {
                "linkId": "q6",
                "text": "Device Skills",
                "answer": [
                  {
                    "valueString": "Illustrative response for device skills"
                  }
                ]
              },
              {
                "linkId": "q7",
                "text": "Hypoglycemia Skills",
                "answer": [
                  {
                    "valueString": "Illustrative response for hypoglycemia skills"
                  }
                ]
              },
              {
                "linkId": "q8",
                "text": "Sick-Day / Ketone Skills",
                "answer": [
                  {
                    "valueString": "Illustrative response for sick-day / ketone skills"
                  }
                ]
              },
              {
                "linkId": "q9",
                "text": "DSMES Need",
                "answer": [
                  {
                    "valueString": "Illustrative response for dsmes need"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  "psychosocialBehavioralHealthAssessment": {
    "title": "Psychosocial / Behavioral Health Assessment",
    "resource": "QuestionnaireResponse",
    "baseUrl": "https://hl7.org/fhir/R4/questionnaireresponse.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-psychosocial-behavioral-health-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-psychosocial-behavioral-health-assessment",
      "version": "0.2.0",
      "name": "PsychosocialBehavioralHealthAssessment",
      "title": "Psychosocial / Behavioral Health Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing psychosocial / behavioral health assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "QuestionnaireResponse",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "QuestionnaireResponse",
            "path": "QuestionnaireResponse",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.questionnaire",
            "path": "QuestionnaireResponse.questionnaire",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.status",
            "path": "QuestionnaireResponse.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.subject",
            "path": "QuestionnaireResponse.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "QuestionnaireResponse.encounter",
            "path": "QuestionnaireResponse.encounter",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.authored",
            "path": "QuestionnaireResponse.authored",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.author",
            "path": "QuestionnaireResponse.author",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.source",
            "path": "QuestionnaireResponse.source",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item",
            "path": "QuestionnaireResponse.item",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.linkId",
            "path": "QuestionnaireResponse.item.linkId",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.text",
            "path": "QuestionnaireResponse.item.text",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer",
            "path": "QuestionnaireResponse.item.answer",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer.value[x]",
            "path": "QuestionnaireResponse.item.answer.value[x]",
            "min": 1,
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "psychosocial-behavioral-health-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/psychosocial-behavioral-health-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "psychosocial-behavioral-health-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Questionnaire/psychosocial-behavioral-health-assessment-example-form",
          "resource": {
            "resourceType": "Questionnaire",
            "id": "psychosocial-behavioral-health-assessment-example-form",
            "url": "https://example.org/fhir/Questionnaire/psychosocial-behavioral-health-assessment-example-form",
            "status": "active",
            "title": "Psychosocial / Behavioral Health Assessment Questionnaire",
            "subjectType": [
              "Patient"
            ],
            "item": [
              {
                "linkId": "q1",
                "text": "Diabetes Distress",
                "type": "string"
              },
              {
                "linkId": "q2",
                "text": "Depressive Symptoms",
                "type": "string"
              },
              {
                "linkId": "q3",
                "text": "Anxiety",
                "type": "string"
              },
              {
                "linkId": "q4",
                "text": "Disordered Eating",
                "type": "string"
              },
              {
                "linkId": "q5",
                "text": "Fear of Hypoglycemia",
                "type": "string"
              },
              {
                "linkId": "q6",
                "text": "Treatment Burden",
                "type": "string"
              },
              {
                "linkId": "q7",
                "text": "Psychosocial Support",
                "type": "string"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/QuestionnaireResponse/psychosocial-behavioral-health-assessment-example",
          "resource": {
            "resourceType": "QuestionnaireResponse",
            "id": "psychosocial-behavioral-health-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-psychosocial-behavioral-health-assessment"
              ]
            },
            "questionnaire": "https://example.org/fhir/Questionnaire/psychosocial-behavioral-health-assessment-example-form",
            "status": "completed",
            "subject": {
              "reference": "Patient/psychosocial-behavioral-health-assessment-patient"
            },
            "authored": "2026-08-11T09:00:00+05:30",
            "source": {
              "reference": "Patient/psychosocial-behavioral-health-assessment-patient"
            },
            "item": [
              {
                "linkId": "q1",
                "text": "Diabetes Distress",
                "answer": [
                  {
                    "valueString": "Illustrative response for diabetes distress"
                  }
                ]
              },
              {
                "linkId": "q2",
                "text": "Depressive Symptoms",
                "answer": [
                  {
                    "valueString": "Illustrative response for depressive symptoms"
                  }
                ]
              },
              {
                "linkId": "q3",
                "text": "Anxiety",
                "answer": [
                  {
                    "valueString": "Illustrative response for anxiety"
                  }
                ]
              },
              {
                "linkId": "q4",
                "text": "Disordered Eating",
                "answer": [
                  {
                    "valueString": "Illustrative response for disordered eating"
                  }
                ]
              },
              {
                "linkId": "q5",
                "text": "Fear of Hypoglycemia",
                "answer": [
                  {
                    "valueString": "Illustrative response for fear of hypoglycemia"
                  }
                ]
              },
              {
                "linkId": "q6",
                "text": "Treatment Burden",
                "answer": [
                  {
                    "valueString": "Illustrative response for treatment burden"
                  }
                ]
              },
              {
                "linkId": "q7",
                "text": "Psychosocial Support",
                "answer": [
                  {
                    "valueString": "Illustrative response for psychosocial support"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  "functionalCognitiveAssessment": {
    "title": "Functional & Cognitive Assessment",
    "resource": "QuestionnaireResponse",
    "baseUrl": "https://hl7.org/fhir/R4/questionnaireresponse.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-functional-cognitive-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-functional-cognitive-assessment",
      "version": "0.2.0",
      "name": "FunctionalCognitiveAssessment",
      "title": "Functional & Cognitive Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing functional & cognitive assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "QuestionnaireResponse",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "QuestionnaireResponse",
            "path": "QuestionnaireResponse",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.questionnaire",
            "path": "QuestionnaireResponse.questionnaire",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.status",
            "path": "QuestionnaireResponse.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.subject",
            "path": "QuestionnaireResponse.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "QuestionnaireResponse.encounter",
            "path": "QuestionnaireResponse.encounter",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.authored",
            "path": "QuestionnaireResponse.authored",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.author",
            "path": "QuestionnaireResponse.author",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.source",
            "path": "QuestionnaireResponse.source",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item",
            "path": "QuestionnaireResponse.item",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.linkId",
            "path": "QuestionnaireResponse.item.linkId",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.text",
            "path": "QuestionnaireResponse.item.text",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer",
            "path": "QuestionnaireResponse.item.answer",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer.value[x]",
            "path": "QuestionnaireResponse.item.answer.value[x]",
            "min": 1,
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "functional-cognitive-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/functional-cognitive-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "functional-cognitive-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Questionnaire/functional-cognitive-assessment-example-form",
          "resource": {
            "resourceType": "Questionnaire",
            "id": "functional-cognitive-assessment-example-form",
            "url": "https://example.org/fhir/Questionnaire/functional-cognitive-assessment-example-form",
            "status": "active",
            "title": "Functional & Cognitive Assessment Questionnaire",
            "subjectType": [
              "Patient"
            ],
            "item": [
              {
                "linkId": "q1",
                "text": "Cognition",
                "type": "string"
              },
              {
                "linkId": "q2",
                "text": "Activities of Daily Living",
                "type": "string"
              },
              {
                "linkId": "q3",
                "text": "Instrumental ADLs",
                "type": "string"
              },
              {
                "linkId": "q4",
                "text": "Frailty",
                "type": "string"
              },
              {
                "linkId": "q5",
                "text": "Falls / Mobility",
                "type": "string"
              },
              {
                "linkId": "q6",
                "text": "Self-Management Capacity",
                "type": "string"
              },
              {
                "linkId": "q7",
                "text": "Caregiver Support",
                "type": "string"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/QuestionnaireResponse/functional-cognitive-assessment-example",
          "resource": {
            "resourceType": "QuestionnaireResponse",
            "id": "functional-cognitive-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-functional-cognitive-assessment"
              ]
            },
            "questionnaire": "https://example.org/fhir/Questionnaire/functional-cognitive-assessment-example-form",
            "status": "completed",
            "subject": {
              "reference": "Patient/functional-cognitive-assessment-patient"
            },
            "authored": "2026-08-11T09:00:00+05:30",
            "source": {
              "reference": "Patient/functional-cognitive-assessment-patient"
            },
            "item": [
              {
                "linkId": "q1",
                "text": "Cognition",
                "answer": [
                  {
                    "valueString": "Illustrative response for cognition"
                  }
                ]
              },
              {
                "linkId": "q2",
                "text": "Activities of Daily Living",
                "answer": [
                  {
                    "valueString": "Illustrative response for activities of daily living"
                  }
                ]
              },
              {
                "linkId": "q3",
                "text": "Instrumental ADLs",
                "answer": [
                  {
                    "valueString": "Illustrative response for instrumental adls"
                  }
                ]
              },
              {
                "linkId": "q4",
                "text": "Frailty",
                "answer": [
                  {
                    "valueString": "Illustrative response for frailty"
                  }
                ]
              },
              {
                "linkId": "q5",
                "text": "Falls / Mobility",
                "answer": [
                  {
                    "valueString": "Illustrative response for falls / mobility"
                  }
                ]
              },
              {
                "linkId": "q6",
                "text": "Self-Management Capacity",
                "answer": [
                  {
                    "valueString": "Illustrative response for self-management capacity"
                  }
                ]
              },
              {
                "linkId": "q7",
                "text": "Caregiver Support",
                "answer": [
                  {
                    "valueString": "Illustrative response for caregiver support"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  "socialNeedsAccessAssessment": {
    "title": "Social Needs & Access Assessment",
    "resource": "QuestionnaireResponse",
    "baseUrl": "https://hl7.org/fhir/R4/questionnaireresponse.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-social-needs-access-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-social-needs-access-assessment",
      "version": "0.2.0",
      "name": "SocialNeedsAccessAssessment",
      "title": "Social Needs & Access Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing social needs & access assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "QuestionnaireResponse",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "QuestionnaireResponse",
            "path": "QuestionnaireResponse",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.questionnaire",
            "path": "QuestionnaireResponse.questionnaire",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.status",
            "path": "QuestionnaireResponse.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.subject",
            "path": "QuestionnaireResponse.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "QuestionnaireResponse.encounter",
            "path": "QuestionnaireResponse.encounter",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.authored",
            "path": "QuestionnaireResponse.authored",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.author",
            "path": "QuestionnaireResponse.author",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.source",
            "path": "QuestionnaireResponse.source",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item",
            "path": "QuestionnaireResponse.item",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.linkId",
            "path": "QuestionnaireResponse.item.linkId",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.text",
            "path": "QuestionnaireResponse.item.text",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer",
            "path": "QuestionnaireResponse.item.answer",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer.value[x]",
            "path": "QuestionnaireResponse.item.answer.value[x]",
            "min": 1,
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "social-needs-access-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/social-needs-access-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "social-needs-access-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Questionnaire/social-needs-access-assessment-example-form",
          "resource": {
            "resourceType": "Questionnaire",
            "id": "social-needs-access-assessment-example-form",
            "url": "https://example.org/fhir/Questionnaire/social-needs-access-assessment-example-form",
            "status": "active",
            "title": "Social Needs & Access Assessment Questionnaire",
            "subjectType": [
              "Patient"
            ],
            "item": [
              {
                "linkId": "q1",
                "text": "Food Security",
                "type": "string"
              },
              {
                "linkId": "q2",
                "text": "Housing Stability",
                "type": "string"
              },
              {
                "linkId": "q3",
                "text": "Financial Strain",
                "type": "string"
              },
              {
                "linkId": "q4",
                "text": "Coverage / Insurance",
                "type": "string"
              },
              {
                "linkId": "q5",
                "text": "Medication Access",
                "type": "string"
              },
              {
                "linkId": "q6",
                "text": "Device / Supply Access",
                "type": "string"
              },
              {
                "linkId": "q7",
                "text": "Health Literacy",
                "type": "string"
              },
              {
                "linkId": "q8",
                "text": "Language Needs",
                "type": "string"
              },
              {
                "linkId": "q9",
                "text": "Transportation",
                "type": "string"
              },
              {
                "linkId": "q10",
                "text": "Social Support",
                "type": "string"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/QuestionnaireResponse/social-needs-access-assessment-example",
          "resource": {
            "resourceType": "QuestionnaireResponse",
            "id": "social-needs-access-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-social-needs-access-assessment"
              ]
            },
            "questionnaire": "https://example.org/fhir/Questionnaire/social-needs-access-assessment-example-form",
            "status": "completed",
            "subject": {
              "reference": "Patient/social-needs-access-assessment-patient"
            },
            "authored": "2026-08-11T09:00:00+05:30",
            "source": {
              "reference": "Patient/social-needs-access-assessment-patient"
            },
            "item": [
              {
                "linkId": "q1",
                "text": "Food Security",
                "answer": [
                  {
                    "valueString": "Illustrative response for food security"
                  }
                ]
              },
              {
                "linkId": "q2",
                "text": "Housing Stability",
                "answer": [
                  {
                    "valueString": "Illustrative response for housing stability"
                  }
                ]
              },
              {
                "linkId": "q3",
                "text": "Financial Strain",
                "answer": [
                  {
                    "valueString": "Illustrative response for financial strain"
                  }
                ]
              },
              {
                "linkId": "q4",
                "text": "Coverage / Insurance",
                "answer": [
                  {
                    "valueString": "Illustrative response for coverage / insurance"
                  }
                ]
              },
              {
                "linkId": "q5",
                "text": "Medication Access",
                "answer": [
                  {
                    "valueString": "Illustrative response for medication access"
                  }
                ]
              },
              {
                "linkId": "q6",
                "text": "Device / Supply Access",
                "answer": [
                  {
                    "valueString": "Illustrative response for device / supply access"
                  }
                ]
              },
              {
                "linkId": "q7",
                "text": "Health Literacy",
                "answer": [
                  {
                    "valueString": "Illustrative response for health literacy"
                  }
                ]
              },
              {
                "linkId": "q8",
                "text": "Language Needs",
                "answer": [
                  {
                    "valueString": "Illustrative response for language needs"
                  }
                ]
              },
              {
                "linkId": "q9",
                "text": "Transportation",
                "answer": [
                  {
                    "valueString": "Illustrative response for transportation"
                  }
                ]
              },
              {
                "linkId": "q10",
                "text": "Social Support",
                "answer": [
                  {
                    "valueString": "Illustrative response for social support"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  "reproductivePregnancyAssessment": {
    "title": "Reproductive / Pregnancy Assessment",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-reproductive-pregnancy-assessment",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-reproductive-pregnancy-assessment",
      "version": "0.2.0",
      "name": "ReproductivePregnancyAssessment",
      "title": "Reproductive / Pregnancy Assessment Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing reproductive / pregnancy assessment within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "reproductive-pregnancy-assessment-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/reproductive-pregnancy-assessment-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "reproductive-pregnancy-assessment-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/reproductive-pregnancy-assessment-example",
          "resource": {
            "resourceType": "Observation",
            "id": "reproductive-pregnancy-assessment-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-reproductive-pregnancy-assessment"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "reproductive-pregnancy-assessment",
                  "display": "Reproductive / Pregnancy Assessment"
                }
              ],
              "text": "Reproductive / Pregnancy Assessment"
            },
            "subject": {
              "reference": "Patient/reproductive-pregnancy-assessment-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "pregnancy-status",
                      "display": "Pregnancy Status"
                    }
                  ],
                  "text": "Pregnancy Status"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "pregnancy-intention",
                      "display": "Pregnancy Intention"
                    }
                  ],
                  "text": "Pregnancy Intention"
                },
                "valueString": "Illustrative pregnancy intention value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "contraception",
                      "display": "Contraception"
                    }
                  ],
                  "text": "Contraception"
                },
                "valueString": "Illustrative contraception value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "preconception-status",
                      "display": "Preconception Status"
                    }
                  ],
                  "text": "Preconception Status"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "gestational-age",
                      "display": "Gestational Age"
                    }
                  ],
                  "text": "Gestational Age"
                },
                "valueString": "Illustrative gestational age value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "postpartum-status",
                      "display": "Postpartum Status"
                    }
                  ],
                  "text": "Postpartum Status"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "bloodGlucoseMonitoring": {
    "title": "Blood Glucose Monitoring",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-blood-glucose-monitoring",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-blood-glucose-monitoring",
      "version": "0.2.0",
      "name": "BloodGlucoseMonitoring",
      "title": "Blood Glucose Monitoring Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing blood glucose monitoring within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "blood-glucose-monitoring-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/blood-glucose-monitoring-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "blood-glucose-monitoring-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/blood-glucose-monitoring-example",
          "resource": {
            "resourceType": "Observation",
            "id": "blood-glucose-monitoring-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-blood-glucose-monitoring"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "blood-glucose-monitoring",
                  "display": "Blood Glucose Monitoring"
                }
              ],
              "text": "Blood Glucose Monitoring"
            },
            "subject": {
              "reference": "Patient/blood-glucose-monitoring-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "monitoring-method",
                      "display": "Monitoring Method"
                    }
                  ],
                  "text": "Monitoring Method"
                },
                "valueString": "Clinician assessment using documented evidence"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "device",
                      "display": "Device"
                    }
                  ],
                  "text": "Device"
                },
                "valueString": "Illustrative device value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "date-time",
                      "display": "Date / Time"
                    }
                  ],
                  "text": "Date / Time"
                },
                "valueString": "2026-08-11"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "measurement-context",
                      "display": "Measurement Context"
                    }
                  ],
                  "text": "Measurement Context"
                },
                "valueString": "Illustrative measurement context value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "glucose-result",
                      "display": "Glucose Result"
                    }
                  ],
                  "text": "Glucose Result"
                },
                "valueQuantity": {
                  "value": 154,
                  "unit": "mg/dL",
                  "system": "http://unitsofmeasure.org",
                  "code": "mg/dL"
                }
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "ketoneMonitoring": {
    "title": "Ketone Monitoring",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-ketone-monitoring",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-ketone-monitoring",
      "version": "0.2.0",
      "name": "KetoneMonitoring",
      "title": "Ketone Monitoring Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing ketone monitoring within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "ketone-monitoring-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/ketone-monitoring-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "ketone-monitoring-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/ketone-monitoring-example",
          "resource": {
            "resourceType": "Observation",
            "id": "ketone-monitoring-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-ketone-monitoring"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "ketone-monitoring",
                  "display": "Ketone Monitoring"
                }
              ],
              "text": "Ketone Monitoring"
            },
            "subject": {
              "reference": "Patient/ketone-monitoring-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "blood-urine",
                      "display": "Blood / Urine"
                    }
                  ],
                  "text": "Blood / Urine"
                },
                "valueString": "Illustrative blood / urine value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "method",
                      "display": "Method"
                    }
                  ],
                  "text": "Method"
                },
                "valueString": "Clinician assessment using documented evidence"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "ketone-result",
                      "display": "Ketone Result"
                    }
                  ],
                  "text": "Ketone Result"
                },
                "valueString": "Illustrative ketone result value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "date-time",
                      "display": "Date / Time"
                    }
                  ],
                  "text": "Date / Time"
                },
                "valueString": "2026-08-11"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "clinical-context",
                      "display": "Clinical Context"
                    }
                  ],
                  "text": "Clinical Context"
                },
                "valueString": "Illustrative clinical context value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "interpretation",
                      "display": "Interpretation"
                    }
                  ],
                  "text": "Interpretation"
                },
                "valueString": "Illustrative interpretation value"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "insulinDeliveryDevice": {
    "title": "Insulin Delivery Device",
    "resource": "DeviceUseStatement",
    "baseUrl": "https://hl7.org/fhir/R4/deviceusestatement.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-insulin-delivery-device",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-insulin-delivery-device",
      "version": "0.2.0",
      "name": "InsulinDeliveryDevice",
      "title": "Insulin Delivery Device Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing insulin delivery device within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "DeviceUseStatement",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/DeviceUseStatement",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "DeviceUseStatement",
            "path": "DeviceUseStatement",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.basedOn",
            "path": "DeviceUseStatement.basedOn",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.status",
            "path": "DeviceUseStatement.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.subject",
            "path": "DeviceUseStatement.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "DeviceUseStatement.derivedFrom",
            "path": "DeviceUseStatement.derivedFrom",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.timing[x]",
            "path": "DeviceUseStatement.timing[x]",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.recordedOn",
            "path": "DeviceUseStatement.recordedOn",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.source",
            "path": "DeviceUseStatement.source",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.device",
            "path": "DeviceUseStatement.device",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Device"
                ]
              }
            ]
          },
          {
            "id": "DeviceUseStatement.reasonCode",
            "path": "DeviceUseStatement.reasonCode",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.reasonReference",
            "path": "DeviceUseStatement.reasonReference",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.note",
            "path": "DeviceUseStatement.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "insulin-delivery-device-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/insulin-delivery-device-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "insulin-delivery-device-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Device/insulin-delivery-device-example-device",
          "resource": {
            "resourceType": "Device",
            "id": "insulin-delivery-device-example-device",
            "status": "active",
            "deviceName": [
              {
                "name": "Illustrative insulin delivery device device",
                "type": "user-friendly-name"
              }
            ],
            "type": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "insulin-delivery-device",
                  "display": "Insulin Delivery Device"
                }
              ],
              "text": "Insulin Delivery Device"
            },
            "patient": {
              "reference": "Patient/insulin-delivery-device-patient"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/DeviceUseStatement/insulin-delivery-device-example",
          "resource": {
            "resourceType": "DeviceUseStatement",
            "id": "insulin-delivery-device-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-insulin-delivery-device"
              ]
            },
            "status": "active",
            "subject": {
              "reference": "Patient/insulin-delivery-device-patient"
            },
            "timingPeriod": {
              "start": "2026-06-01",
              "end": "2026-08-11"
            },
            "recordedOn": "2026-08-11T09:00:00+05:30",
            "device": {
              "reference": "Device/insulin-delivery-device-example-device"
            },
            "reasonCode": [
              {
                "text": "Diabetes management"
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Device Type; Insulin; Start / Stop; Basal Settings; Bolus Settings; Insulin-to-Carbohydrate Ratio; Insulin Sensitivity / Correction Factor; Target Glucose; Device Status."
              }
            ]
          }
        }
      ]
    }
  },
  "automatedInsulinDelivery": {
    "title": "Automated Insulin Delivery",
    "resource": "DeviceUseStatement",
    "baseUrl": "https://hl7.org/fhir/R4/deviceusestatement.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-automated-insulin-delivery",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-automated-insulin-delivery",
      "version": "0.2.0",
      "name": "AutomatedInsulinDelivery",
      "title": "Automated Insulin Delivery Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing automated insulin delivery within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "DeviceUseStatement",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/DeviceUseStatement",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "DeviceUseStatement",
            "path": "DeviceUseStatement",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.basedOn",
            "path": "DeviceUseStatement.basedOn",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.status",
            "path": "DeviceUseStatement.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.subject",
            "path": "DeviceUseStatement.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "DeviceUseStatement.derivedFrom",
            "path": "DeviceUseStatement.derivedFrom",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.timing[x]",
            "path": "DeviceUseStatement.timing[x]",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.recordedOn",
            "path": "DeviceUseStatement.recordedOn",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.source",
            "path": "DeviceUseStatement.source",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.device",
            "path": "DeviceUseStatement.device",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Device"
                ]
              }
            ]
          },
          {
            "id": "DeviceUseStatement.reasonCode",
            "path": "DeviceUseStatement.reasonCode",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.reasonReference",
            "path": "DeviceUseStatement.reasonReference",
            "mustSupport": true
          },
          {
            "id": "DeviceUseStatement.note",
            "path": "DeviceUseStatement.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "automated-insulin-delivery-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/automated-insulin-delivery-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "automated-insulin-delivery-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Device/automated-insulin-delivery-example-device",
          "resource": {
            "resourceType": "Device",
            "id": "automated-insulin-delivery-example-device",
            "status": "active",
            "deviceName": [
              {
                "name": "Illustrative automated insulin delivery device",
                "type": "user-friendly-name"
              }
            ],
            "type": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "automated-insulin-delivery",
                  "display": "Automated Insulin Delivery"
                }
              ],
              "text": "Automated Insulin Delivery"
            },
            "patient": {
              "reference": "Patient/automated-insulin-delivery-patient"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/DeviceUseStatement/automated-insulin-delivery-example",
          "resource": {
            "resourceType": "DeviceUseStatement",
            "id": "automated-insulin-delivery-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-automated-insulin-delivery"
              ]
            },
            "status": "active",
            "subject": {
              "reference": "Patient/automated-insulin-delivery-patient"
            },
            "timingPeriod": {
              "start": "2026-06-01",
              "end": "2026-08-11"
            },
            "recordedOn": "2026-08-11T09:00:00+05:30",
            "device": {
              "reference": "Device/automated-insulin-delivery-example-device"
            },
            "reasonCode": [
              {
                "text": "Diabetes management"
              }
            ],
            "note": [
              {
                "text": "Graph coverage: AID System; Automation Mode; CGM Integration; Algorithm Target; Time in Automation; Insulin Delivery Summary; Override / Exit Information."
              }
            ]
          }
        }
      ]
    }
  },
  "medicationTherapy": {
    "title": "Diabetes-Related Medication Therapy",
    "resource": "MedicationRequest",
    "baseUrl": "https://hl7.org/fhir/R4/medicationrequest.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-related-medication-therapy",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-related-medication-therapy",
      "version": "0.2.0",
      "name": "DiabetesRelatedMedicationTherapy",
      "title": "Diabetes-Related Medication Therapy Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes-related medication therapy within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "MedicationRequest",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/MedicationRequest",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "MedicationRequest",
            "path": "MedicationRequest",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.status",
            "path": "MedicationRequest.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.intent",
            "path": "MedicationRequest.intent",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.category",
            "path": "MedicationRequest.category",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.priority",
            "path": "MedicationRequest.priority",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.medication[x]",
            "path": "MedicationRequest.medication[x]",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer RxNorm for medication identity when an appropriate concept exists."
            }
          },
          {
            "id": "MedicationRequest.subject",
            "path": "MedicationRequest.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "MedicationRequest.authoredOn",
            "path": "MedicationRequest.authoredOn",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.requester",
            "path": "MedicationRequest.requester",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.reasonCode",
            "path": "MedicationRequest.reasonCode",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.reasonReference",
            "path": "MedicationRequest.reasonReference",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.courseOfTherapyType",
            "path": "MedicationRequest.courseOfTherapyType",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.dosageInstruction",
            "path": "MedicationRequest.dosageInstruction",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.note",
            "path": "MedicationRequest.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-related-medication-therapy-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-related-medication-therapy-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-related-medication-therapy-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-related-medication-therapy-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-related-medication-therapy-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-related-medication-therapy-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/MedicationRequest/diabetes-related-medication-therapy-example",
          "resource": {
            "resourceType": "MedicationRequest",
            "id": "diabetes-related-medication-therapy-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-related-medication-therapy"
              ]
            },
            "status": "active",
            "intent": "plan",
            "category": [
              {
                "text": "Diabetes medication therapy"
              }
            ],
            "medicationCodeableConcept": {
              "text": "Illustrative glucose-lowering medication"
            },
            "subject": {
              "reference": "Patient/diabetes-related-medication-therapy-patient"
            },
            "authoredOn": "2026-08-11",
            "reasonReference": [
              {
                "reference": "Condition/diabetes-related-medication-therapy-example-diabetes"
              }
            ],
            "dosageInstruction": [
              {
                "text": "Dose, route, frequency, timing, and titration individualized to the patient."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Medication; Indication / Reason; Treatment Intent; Dose; Route; Frequency; Start Date; Status; Reason for Start / Change / Stop; Adverse Effects / Tolerance. Prefer RxNorm coding for medication identity in a production implementation."
              }
            ]
          }
        }
      ]
    }
  },
  "medicationAdministration": {
    "title": "Diabetes-Related Medication Administration",
    "resource": "MedicationAdministration",
    "baseUrl": "https://hl7.org/fhir/R4/medicationadministration.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-related-medication-administration",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-related-medication-administration",
      "version": "0.2.0",
      "name": "DiabetesRelatedMedicationAdministration",
      "title": "Diabetes-Related Medication Administration Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes-related medication administration within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "MedicationAdministration",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/MedicationAdministration",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "MedicationAdministration",
            "path": "MedicationAdministration",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.status",
            "path": "MedicationAdministration.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.statusReason",
            "path": "MedicationAdministration.statusReason",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.category",
            "path": "MedicationAdministration.category",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.medication[x]",
            "path": "MedicationAdministration.medication[x]",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer RxNorm for medication identity when an appropriate concept exists."
            }
          },
          {
            "id": "MedicationAdministration.subject",
            "path": "MedicationAdministration.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "MedicationAdministration.context",
            "path": "MedicationAdministration.context",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.effective[x]",
            "path": "MedicationAdministration.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.performer",
            "path": "MedicationAdministration.performer",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.reasonCode",
            "path": "MedicationAdministration.reasonCode",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.request",
            "path": "MedicationAdministration.request",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.dosage",
            "path": "MedicationAdministration.dosage",
            "mustSupport": true
          },
          {
            "id": "MedicationAdministration.note",
            "path": "MedicationAdministration.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-related-medication-administration-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-related-medication-administration-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-related-medication-administration-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-related-medication-administration-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-related-medication-administration-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-related-medication-administration-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/MedicationAdministration/diabetes-related-medication-administration-example",
          "resource": {
            "resourceType": "MedicationAdministration",
            "id": "diabetes-related-medication-administration-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-related-medication-administration"
              ]
            },
            "status": "completed",
            "category": {
              "text": "Diabetes medication administration"
            },
            "medicationCodeableConcept": {
              "text": "Illustrative insulin dose"
            },
            "subject": {
              "reference": "Patient/diabetes-related-medication-administration-patient"
            },
            "effectiveDateTime": "2026-08-11T08:00:00+05:30",
            "reasonReference": [
              {
                "reference": "Condition/diabetes-related-medication-administration-example-diabetes"
              }
            ],
            "dosage": {
              "text": "Illustrative administered dose",
              "dose": {
                "value": 8,
                "unit": "[iU]",
                "system": "http://unitsofmeasure.org",
                "code": "[iU]"
              }
            },
            "note": [
              {
                "text": "Graph coverage: Medication; Dose; Route; Administration Time; Status; Status Reason."
              }
            ]
          }
        }
      ]
    }
  },
  "insulinRegimen": {
    "title": "Insulin Regimen",
    "resource": "MedicationRequest",
    "baseUrl": "https://hl7.org/fhir/R4/medicationrequest.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-insulin-regimen",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-insulin-regimen",
      "version": "0.2.0",
      "name": "InsulinRegimen",
      "title": "Insulin Regimen Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing insulin regimen within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "MedicationRequest",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/MedicationRequest",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "MedicationRequest",
            "path": "MedicationRequest",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.status",
            "path": "MedicationRequest.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.intent",
            "path": "MedicationRequest.intent",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.category",
            "path": "MedicationRequest.category",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.priority",
            "path": "MedicationRequest.priority",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.medication[x]",
            "path": "MedicationRequest.medication[x]",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer RxNorm for medication identity when an appropriate concept exists."
            }
          },
          {
            "id": "MedicationRequest.subject",
            "path": "MedicationRequest.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "MedicationRequest.authoredOn",
            "path": "MedicationRequest.authoredOn",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.requester",
            "path": "MedicationRequest.requester",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.reasonCode",
            "path": "MedicationRequest.reasonCode",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.reasonReference",
            "path": "MedicationRequest.reasonReference",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.courseOfTherapyType",
            "path": "MedicationRequest.courseOfTherapyType",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.dosageInstruction",
            "path": "MedicationRequest.dosageInstruction",
            "mustSupport": true
          },
          {
            "id": "MedicationRequest.note",
            "path": "MedicationRequest.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "insulin-regimen-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/insulin-regimen-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "insulin-regimen-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/insulin-regimen-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "insulin-regimen-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/insulin-regimen-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/MedicationRequest/insulin-regimen-example",
          "resource": {
            "resourceType": "MedicationRequest",
            "id": "insulin-regimen-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-insulin-regimen"
              ]
            },
            "status": "active",
            "intent": "plan",
            "category": [
              {
                "text": "Diabetes medication therapy"
              }
            ],
            "medicationCodeableConcept": {
              "text": "Basal insulin regimen"
            },
            "subject": {
              "reference": "Patient/insulin-regimen-patient"
            },
            "authoredOn": "2026-08-11",
            "reasonReference": [
              {
                "reference": "Condition/insulin-regimen-example-diabetes"
              }
            ],
            "dosageInstruction": [
              {
                "text": "Dose, route, frequency, timing, and titration individualized to the patient."
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Basal Insulin; Prandial Insulin; Correction Insulin; Total Daily Dose; Insulin-to-Carbohydrate Ratio; Correction Factor; Target Glucose; Delivery Method; Timing / Schedule. Prefer RxNorm coding for medication identity in a production implementation."
              }
            ]
          }
        }
      ]
    }
  },
  "lifestyleBehavioralTherapy": {
    "title": "Lifestyle & Behavioral Therapy",
    "resource": "ServiceRequest",
    "baseUrl": "https://hl7.org/fhir/R4/servicerequest.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-lifestyle-behavioral-therapy",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-lifestyle-behavioral-therapy",
      "version": "0.2.0",
      "name": "LifestyleBehavioralTherapy",
      "title": "Lifestyle & Behavioral Therapy Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing lifestyle & behavioral therapy within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ServiceRequest",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ServiceRequest",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ServiceRequest",
            "path": "ServiceRequest",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.status",
            "path": "ServiceRequest.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.intent",
            "path": "ServiceRequest.intent",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.category",
            "path": "ServiceRequest.category",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.priority",
            "path": "ServiceRequest.priority",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.doNotPerform",
            "path": "ServiceRequest.doNotPerform",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.code",
            "path": "ServiceRequest.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT or another standard procedure/service terminology when an appropriate concept exists."
            }
          },
          {
            "id": "ServiceRequest.subject",
            "path": "ServiceRequest.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ServiceRequest.occurrence[x]",
            "path": "ServiceRequest.occurrence[x]",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.authoredOn",
            "path": "ServiceRequest.authoredOn",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.requester",
            "path": "ServiceRequest.requester",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.reasonCode",
            "path": "ServiceRequest.reasonCode",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.reasonReference",
            "path": "ServiceRequest.reasonReference",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.note",
            "path": "ServiceRequest.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "lifestyle-behavioral-therapy-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/lifestyle-behavioral-therapy-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "lifestyle-behavioral-therapy-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/lifestyle-behavioral-therapy-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "lifestyle-behavioral-therapy-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/lifestyle-behavioral-therapy-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ServiceRequest/lifestyle-behavioral-therapy-example",
          "resource": {
            "resourceType": "ServiceRequest",
            "id": "lifestyle-behavioral-therapy-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-lifestyle-behavioral-therapy"
              ]
            },
            "status": "active",
            "intent": "plan",
            "priority": "routine",
            "category": [
              {
                "text": "Diabetes supportive therapy / service"
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "lifestyle-behavioral-therapy",
                  "display": "Lifestyle & Behavioral Therapy"
                }
              ],
              "text": "Lifestyle & Behavioral Therapy"
            },
            "subject": {
              "reference": "Patient/lifestyle-behavioral-therapy-patient"
            },
            "occurrencePeriod": {
              "start": "2026-08-15",
              "end": "2026-11-15"
            },
            "authoredOn": "2026-08-11",
            "reasonReference": [
              {
                "reference": "Condition/lifestyle-behavioral-therapy-example-diabetes"
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Nutrition Therapy; Physical Activity; Sleep / Lifestyle; Behavioral Strategies; Goal; Frequency / Duration; Participation / Status."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesSelfManagementEducationSupport": {
    "title": "Diabetes Self-Management Education & Support",
    "resource": "ServiceRequest",
    "baseUrl": "https://hl7.org/fhir/R4/servicerequest.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-self-management-education-support",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-self-management-education-support",
      "version": "0.2.0",
      "name": "DiabetesSelfManagementEducationSupport",
      "title": "Diabetes Self-Management Education & Support Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes self-management education & support within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ServiceRequest",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ServiceRequest",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ServiceRequest",
            "path": "ServiceRequest",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.status",
            "path": "ServiceRequest.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.intent",
            "path": "ServiceRequest.intent",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.category",
            "path": "ServiceRequest.category",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.priority",
            "path": "ServiceRequest.priority",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.doNotPerform",
            "path": "ServiceRequest.doNotPerform",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.code",
            "path": "ServiceRequest.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT or another standard procedure/service terminology when an appropriate concept exists."
            }
          },
          {
            "id": "ServiceRequest.subject",
            "path": "ServiceRequest.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ServiceRequest.occurrence[x]",
            "path": "ServiceRequest.occurrence[x]",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.authoredOn",
            "path": "ServiceRequest.authoredOn",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.requester",
            "path": "ServiceRequest.requester",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.reasonCode",
            "path": "ServiceRequest.reasonCode",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.reasonReference",
            "path": "ServiceRequest.reasonReference",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.note",
            "path": "ServiceRequest.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-self-management-education-support-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-self-management-education-support-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-self-management-education-support-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-self-management-education-support-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-self-management-education-support-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-self-management-education-support-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ServiceRequest/diabetes-self-management-education-support-example",
          "resource": {
            "resourceType": "ServiceRequest",
            "id": "diabetes-self-management-education-support-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-self-management-education-support"
              ]
            },
            "status": "active",
            "intent": "plan",
            "priority": "routine",
            "category": [
              {
                "text": "Diabetes supportive therapy / service"
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-self-management-education-support",
                  "display": "Diabetes Self-Management Education & Support"
                }
              ],
              "text": "Diabetes Self-Management Education & Support"
            },
            "subject": {
              "reference": "Patient/diabetes-self-management-education-support-patient"
            },
            "occurrencePeriod": {
              "start": "2026-08-15",
              "end": "2026-11-15"
            },
            "authoredOn": "2026-08-11",
            "reasonReference": [
              {
                "reference": "Condition/diabetes-self-management-education-support-example-diabetes"
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Education Topic; Learning Goal; Education Method; Medication Skills; Monitoring Skills; Nutrition Skills; Hypoglycemia Skills; Sick-Day Skills; Technology / Device Training; Understanding / Completion."
              }
            ]
          }
        }
      ]
    }
  },
  "weightManagementIntervention": {
    "title": "Weight Management Intervention",
    "resource": "ServiceRequest",
    "baseUrl": "https://hl7.org/fhir/R4/servicerequest.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-weight-management-intervention",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-weight-management-intervention",
      "version": "0.2.0",
      "name": "WeightManagementIntervention",
      "title": "Weight Management Intervention Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing weight management intervention within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "ServiceRequest",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/ServiceRequest",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "ServiceRequest",
            "path": "ServiceRequest",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.status",
            "path": "ServiceRequest.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.intent",
            "path": "ServiceRequest.intent",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.category",
            "path": "ServiceRequest.category",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.priority",
            "path": "ServiceRequest.priority",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.doNotPerform",
            "path": "ServiceRequest.doNotPerform",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.code",
            "path": "ServiceRequest.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT or another standard procedure/service terminology when an appropriate concept exists."
            }
          },
          {
            "id": "ServiceRequest.subject",
            "path": "ServiceRequest.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "ServiceRequest.occurrence[x]",
            "path": "ServiceRequest.occurrence[x]",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.authoredOn",
            "path": "ServiceRequest.authoredOn",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.requester",
            "path": "ServiceRequest.requester",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.reasonCode",
            "path": "ServiceRequest.reasonCode",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.reasonReference",
            "path": "ServiceRequest.reasonReference",
            "mustSupport": true
          },
          {
            "id": "ServiceRequest.note",
            "path": "ServiceRequest.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "weight-management-intervention-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/weight-management-intervention-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "weight-management-intervention-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/weight-management-intervention-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "weight-management-intervention-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/weight-management-intervention-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/ServiceRequest/weight-management-intervention-example",
          "resource": {
            "resourceType": "ServiceRequest",
            "id": "weight-management-intervention-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-weight-management-intervention"
              ]
            },
            "status": "active",
            "intent": "plan",
            "priority": "routine",
            "category": [
              {
                "text": "Diabetes supportive therapy / service"
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "weight-management-intervention",
                  "display": "Weight Management Intervention"
                }
              ],
              "text": "Weight Management Intervention"
            },
            "subject": {
              "reference": "Patient/weight-management-intervention-patient"
            },
            "occurrencePeriod": {
              "start": "2026-08-15",
              "end": "2026-11-15"
            },
            "authoredOn": "2026-08-11",
            "reasonReference": [
              {
                "reference": "Condition/weight-management-intervention-example-diabetes"
              }
            ],
            "note": [
              {
                "text": "Graph coverage: Treatment Strategy; Weight Target; Lifestyle Component; Medication Component; Procedure Component; Response."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesMetabolicProcedure": {
    "title": "Diabetes / Metabolic Procedure",
    "resource": "Procedure",
    "baseUrl": "https://hl7.org/fhir/R4/procedure.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-metabolic-procedure",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-metabolic-procedure",
      "version": "0.2.0",
      "name": "DiabetesMetabolicProcedure",
      "title": "Diabetes / Metabolic Procedure Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes / metabolic procedure within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Procedure",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Procedure",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Procedure",
            "path": "Procedure",
            "mustSupport": true
          },
          {
            "id": "Procedure.basedOn",
            "path": "Procedure.basedOn",
            "mustSupport": true
          },
          {
            "id": "Procedure.status",
            "path": "Procedure.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Procedure.statusReason",
            "path": "Procedure.statusReason",
            "mustSupport": true
          },
          {
            "id": "Procedure.category",
            "path": "Procedure.category",
            "mustSupport": true
          },
          {
            "id": "Procedure.code",
            "path": "Procedure.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for procedure identity when an appropriate concept exists."
            }
          },
          {
            "id": "Procedure.subject",
            "path": "Procedure.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Procedure.performed[x]",
            "path": "Procedure.performed[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Procedure.performer",
            "path": "Procedure.performer",
            "mustSupport": true
          },
          {
            "id": "Procedure.reasonCode",
            "path": "Procedure.reasonCode",
            "mustSupport": true
          },
          {
            "id": "Procedure.reasonReference",
            "path": "Procedure.reasonReference",
            "mustSupport": true
          },
          {
            "id": "Procedure.bodySite",
            "path": "Procedure.bodySite",
            "mustSupport": true
          },
          {
            "id": "Procedure.outcome",
            "path": "Procedure.outcome",
            "mustSupport": true
          },
          {
            "id": "Procedure.note",
            "path": "Procedure.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-metabolic-procedure-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-metabolic-procedure-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-metabolic-procedure-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-metabolic-procedure-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-metabolic-procedure-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "44054006",
                  "display": "Type 2 diabetes mellitus"
                }
              ],
              "text": "Type 2 diabetes mellitus"
            },
            "subject": {
              "reference": "Patient/diabetes-metabolic-procedure-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Procedure/diabetes-metabolic-procedure-example",
          "resource": {
            "resourceType": "Procedure",
            "id": "diabetes-metabolic-procedure-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-metabolic-procedure"
              ]
            },
            "status": "completed",
            "category": {
              "text": "Diabetes / metabolic procedure"
            },
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-metabolic-procedure",
                  "display": "Diabetes / Metabolic Procedure"
                }
              ],
              "text": "Diabetes / Metabolic Procedure"
            },
            "subject": {
              "reference": "Patient/diabetes-metabolic-procedure-patient"
            },
            "performedDateTime": "2026-07-20T10:00:00+05:30",
            "reasonReference": [
              {
                "reference": "Condition/diabetes-metabolic-procedure-example-diabetes"
              }
            ],
            "outcome": {
              "text": "Procedure completed; follow-up required"
            },
            "note": [
              {
                "text": "Graph coverage: Procedure Type; Indication; Procedure Date; Status; Outcome."
              }
            ]
          }
        }
      ]
    }
  },
  "glycemicStatus": {
    "title": "Glycemic Status",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-glycemic-status",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-glycemic-status",
      "version": "0.2.0",
      "name": "GlycemicStatus",
      "title": "Glycemic Status Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing glycemic status within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "glycemic-status-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/glycemic-status-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "glycemic-status-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/glycemic-status-example",
          "resource": {
            "resourceType": "Observation",
            "id": "glycemic-status-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-glycemic-status"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "glycemic-status",
                  "display": "Glycemic Status"
                }
              ],
              "text": "Glycemic Status"
            },
            "subject": {
              "reference": "Patient/glycemic-status-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "assessment-period",
                      "display": "Assessment Period"
                    }
                  ],
                  "text": "Assessment Period"
                },
                "valueString": "Illustrative assessment period value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "evidence-type",
                      "display": "Evidence Type"
                    }
                  ],
                  "text": "Evidence Type"
                },
                "valueString": "Illustrative evidence type value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "target",
                      "display": "Target"
                    }
                  ],
                  "text": "Target"
                },
                "valueString": "Individualized target documented"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "target-achievement",
                      "display": "Target Achievement"
                    }
                  ],
                  "text": "Target Achievement"
                },
                "valueString": "Individualized target documented"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "trend",
                      "display": "Trend"
                    }
                  ],
                  "text": "Trend"
                },
                "valueString": "Illustrative trend value"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "hypoglycemiaEvent": {
    "title": "Hypoglycemia Event",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-hypoglycemia-event",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-hypoglycemia-event",
      "version": "0.2.0",
      "name": "HypoglycemiaEvent",
      "title": "Hypoglycemia Event Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing hypoglycemia event within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "hypoglycemia-event-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/hypoglycemia-event-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "hypoglycemia-event-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/hypoglycemia-event-example",
          "resource": {
            "resourceType": "Observation",
            "id": "hypoglycemia-event-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-hypoglycemia-event"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "hypoglycemia-event",
                  "display": "Hypoglycemia Event"
                }
              ],
              "text": "Hypoglycemia Event"
            },
            "subject": {
              "reference": "Patient/hypoglycemia-event-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "date-time",
                      "display": "Date / Time"
                    }
                  ],
                  "text": "Date / Time"
                },
                "valueString": "2026-08-11"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "glucose-value",
                      "display": "Glucose Value"
                    }
                  ],
                  "text": "Glucose Value"
                },
                "valueQuantity": {
                  "value": 154,
                  "unit": "mg/dL",
                  "system": "http://unitsofmeasure.org",
                  "code": "mg/dL"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "severity-level",
                      "display": "Severity / Level"
                    }
                  ],
                  "text": "Severity / Level"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "moderate",
                      "display": "Moderate"
                    }
                  ],
                  "text": "Moderate"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "symptoms",
                      "display": "Symptoms"
                    }
                  ],
                  "text": "Symptoms"
                },
                "valueString": "Illustrative symptoms value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "assistance-required",
                      "display": "Assistance Required"
                    }
                  ],
                  "text": "Assistance Required"
                },
                "valueString": "Illustrative assistance required value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "treatment-given",
                      "display": "Treatment Given"
                    }
                  ],
                  "text": "Treatment Given"
                },
                "valueString": "Illustrative treatment given value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "precipitating-factor",
                      "display": "Precipitating Factor"
                    }
                  ],
                  "text": "Precipitating Factor"
                },
                "valueString": "Illustrative precipitating factor value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "outcome",
                      "display": "Outcome"
                    }
                  ],
                  "text": "Outcome"
                },
                "valueString": "Illustrative outcome value"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "hyperglycemicCrisis": {
    "title": "Hyperglycemic Crisis",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-hyperglycemic-crisis",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-hyperglycemic-crisis",
      "version": "0.2.0",
      "name": "HyperglycemicCrisis",
      "title": "Hyperglycemic Crisis Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing hyperglycemic crisis within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "hyperglycemic-crisis-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/hyperglycemic-crisis-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "hyperglycemic-crisis-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/hyperglycemic-crisis-example",
          "resource": {
            "resourceType": "Condition",
            "id": "hyperglycemic-crisis-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-hyperglycemic-crisis"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "hyperglycemic-crisis",
                  "display": "Hyperglycemic Crisis"
                }
              ],
              "text": "Hyperglycemic Crisis"
            },
            "subject": {
              "reference": "Patient/hyperglycemic-crisis-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Crisis Type; Date / Time; Glucose; Ketosis; Acid-Base Status; Osmolality / Hydration; Severity; Precipitating Factor; Care Setting; Resolution. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesComplicationStatus": {
    "title": "Diabetes Complication Status",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-complication-status",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-complication-status",
      "version": "0.2.0",
      "name": "DiabetesComplicationStatus",
      "title": "Diabetes Complication Status Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes complication status within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-complication-status-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-complication-status-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-complication-status-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/diabetes-complication-status-example",
          "resource": {
            "resourceType": "Observation",
            "id": "diabetes-complication-status-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-complication-status"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-complication-status",
                  "display": "Diabetes Complication Status"
                }
              ],
              "text": "Diabetes Complication Status"
            },
            "subject": {
              "reference": "Patient/diabetes-complication-status-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "complication-reference",
                      "display": "Complication Reference"
                    }
                  ],
                  "text": "Complication Reference"
                },
                "valueString": "Illustrative complication reference value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "evidence",
                      "display": "Evidence"
                    }
                  ],
                  "text": "Evidence"
                },
                "valueString": "Illustrative evidence value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "status",
                      "display": "Status"
                    }
                  ],
                  "text": "Status"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "trend",
                      "display": "Trend"
                    }
                  ],
                  "text": "Trend"
                },
                "valueString": "Illustrative trend value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "assessment-date",
                      "display": "Assessment Date"
                    }
                  ],
                  "text": "Assessment Date"
                },
                "valueString": "2026-08-11"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesRemissionStatus": {
    "title": "Diabetes Remission Status",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-remission-status",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-remission-status",
      "version": "0.2.0",
      "name": "DiabetesRemissionStatus",
      "title": "Diabetes Remission Status Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes remission status within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-remission-status-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-remission-status-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-remission-status-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/diabetes-remission-status-example",
          "resource": {
            "resourceType": "Observation",
            "id": "diabetes-remission-status-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-remission-status"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-remission-status",
                  "display": "Diabetes Remission Status"
                }
              ],
              "text": "Diabetes Remission Status"
            },
            "subject": {
              "reference": "Patient/diabetes-remission-status-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "remission-status",
                      "display": "Remission Status"
                    }
                  ],
                  "text": "Remission Status"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "start-date",
                      "display": "Start Date"
                    }
                  ],
                  "text": "Start Date"
                },
                "valueString": "2026-08-11"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "glycemic-evidence",
                      "display": "Glycemic Evidence"
                    }
                  ],
                  "text": "Glycemic Evidence"
                },
                "valueString": "Illustrative glycemic evidence value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "glucose-lowering-medication-status",
                      "display": "Glucose-Lowering Medication Status"
                    }
                  ],
                  "text": "Glucose-Lowering Medication Status"
                },
                "valueCodeableConcept": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "stable",
                      "display": "Stable / active as clinically applicable"
                    }
                  ],
                  "text": "Stable / active as clinically applicable"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "duration",
                      "display": "Duration"
                    }
                  ],
                  "text": "Duration"
                },
                "valueQuantity": {
                  "value": 8,
                  "unit": "a",
                  "system": "http://unitsofmeasure.org",
                  "code": "a"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "recurrence",
                      "display": "Recurrence"
                    }
                  ],
                  "text": "Recurrence"
                },
                "valueString": "Illustrative recurrence value"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "treatmentResponse": {
    "title": "Treatment Response",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-treatment-response",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-treatment-response",
      "version": "0.2.0",
      "name": "TreatmentResponse",
      "title": "Treatment Response Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing treatment response within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "treatment-response-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/treatment-response-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "treatment-response-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/treatment-response-example",
          "resource": {
            "resourceType": "Observation",
            "id": "treatment-response-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-treatment-response"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "treatment-response",
                  "display": "Treatment Response"
                }
              ],
              "text": "Treatment Response"
            },
            "subject": {
              "reference": "Patient/treatment-response-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "response-domain",
                      "display": "Response Domain"
                    }
                  ],
                  "text": "Response Domain"
                },
                "valueString": "Illustrative response domain value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "baseline",
                      "display": "Baseline"
                    }
                  ],
                  "text": "Baseline"
                },
                "valueString": "Illustrative baseline value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "follow-up",
                      "display": "Follow-Up"
                    }
                  ],
                  "text": "Follow-Up"
                },
                "valueString": "Illustrative follow-up value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "change-response",
                      "display": "Change / Response"
                    }
                  ],
                  "text": "Change / Response"
                },
                "valueString": "Illustrative change / response value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "tolerance-safety",
                      "display": "Tolerance / Safety"
                    }
                  ],
                  "text": "Tolerance / Safety"
                },
                "valueString": "Illustrative tolerance / safety value"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "patientReportedDiabetesOutcome": {
    "title": "Patient-Reported Diabetes Outcome",
    "resource": "QuestionnaireResponse",
    "baseUrl": "https://hl7.org/fhir/R4/questionnaireresponse.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-patient-reported-diabetes-outcome",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-patient-reported-diabetes-outcome",
      "version": "0.2.0",
      "name": "PatientReportedDiabetesOutcome",
      "title": "Patient-Reported Diabetes Outcome Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing patient-reported diabetes outcome within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "QuestionnaireResponse",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "QuestionnaireResponse",
            "path": "QuestionnaireResponse",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.questionnaire",
            "path": "QuestionnaireResponse.questionnaire",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.status",
            "path": "QuestionnaireResponse.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.subject",
            "path": "QuestionnaireResponse.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "QuestionnaireResponse.encounter",
            "path": "QuestionnaireResponse.encounter",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.authored",
            "path": "QuestionnaireResponse.authored",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.author",
            "path": "QuestionnaireResponse.author",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.source",
            "path": "QuestionnaireResponse.source",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item",
            "path": "QuestionnaireResponse.item",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.linkId",
            "path": "QuestionnaireResponse.item.linkId",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.text",
            "path": "QuestionnaireResponse.item.text",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer",
            "path": "QuestionnaireResponse.item.answer",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer.value[x]",
            "path": "QuestionnaireResponse.item.answer.value[x]",
            "min": 1,
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "patient-reported-diabetes-outcome-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/patient-reported-diabetes-outcome-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "patient-reported-diabetes-outcome-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Questionnaire/patient-reported-diabetes-outcome-example-form",
          "resource": {
            "resourceType": "Questionnaire",
            "id": "patient-reported-diabetes-outcome-example-form",
            "url": "https://example.org/fhir/Questionnaire/patient-reported-diabetes-outcome-example-form",
            "status": "active",
            "title": "Patient-Reported Diabetes Outcome Questionnaire",
            "subjectType": [
              "Patient"
            ],
            "item": [
              {
                "linkId": "q1",
                "text": "Quality of Life",
                "type": "string"
              },
              {
                "linkId": "q2",
                "text": "Treatment Satisfaction",
                "type": "string"
              },
              {
                "linkId": "q3",
                "text": "Treatment Burden",
                "type": "string"
              },
              {
                "linkId": "q4",
                "text": "Diabetes Distress",
                "type": "string"
              },
              {
                "linkId": "q5",
                "text": "Daily Function",
                "type": "string"
              },
              {
                "linkId": "q6",
                "text": "Assessment Date",
                "type": "string"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/QuestionnaireResponse/patient-reported-diabetes-outcome-example",
          "resource": {
            "resourceType": "QuestionnaireResponse",
            "id": "patient-reported-diabetes-outcome-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-patient-reported-diabetes-outcome"
              ]
            },
            "questionnaire": "https://example.org/fhir/Questionnaire/patient-reported-diabetes-outcome-example-form",
            "status": "completed",
            "subject": {
              "reference": "Patient/patient-reported-diabetes-outcome-patient"
            },
            "authored": "2026-08-11T09:00:00+05:30",
            "source": {
              "reference": "Patient/patient-reported-diabetes-outcome-patient"
            },
            "item": [
              {
                "linkId": "q1",
                "text": "Quality of Life",
                "answer": [
                  {
                    "valueString": "Illustrative response for quality of life"
                  }
                ]
              },
              {
                "linkId": "q2",
                "text": "Treatment Satisfaction",
                "answer": [
                  {
                    "valueString": "Illustrative response for treatment satisfaction"
                  }
                ]
              },
              {
                "linkId": "q3",
                "text": "Treatment Burden",
                "answer": [
                  {
                    "valueString": "Illustrative response for treatment burden"
                  }
                ]
              },
              {
                "linkId": "q4",
                "text": "Diabetes Distress",
                "answer": [
                  {
                    "valueString": "Illustrative response for diabetes distress"
                  }
                ]
              },
              {
                "linkId": "q5",
                "text": "Daily Function",
                "answer": [
                  {
                    "valueString": "Illustrative response for daily function"
                  }
                ]
              },
              {
                "linkId": "q6",
                "text": "Assessment Date",
                "answer": [
                  {
                    "valueString": "Illustrative response for assessment date"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  "diabetesInPregnancy": {
    "title": "Diabetes in Pregnancy",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-diabetes-in-pregnancy",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-diabetes-in-pregnancy",
      "version": "0.2.0",
      "name": "DiabetesInPregnancy",
      "title": "Diabetes in Pregnancy Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing diabetes in pregnancy within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "diabetes-in-pregnancy-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/diabetes-in-pregnancy-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "diabetes-in-pregnancy-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1992-06-22"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/diabetes-in-pregnancy-example",
          "resource": {
            "resourceType": "Condition",
            "id": "diabetes-in-pregnancy-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-diabetes-in-pregnancy"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "diabetes-in-pregnancy",
                  "display": "Diabetes in Pregnancy"
                }
              ],
              "text": "Diabetes in Pregnancy"
            },
            "subject": {
              "reference": "Patient/diabetes-in-pregnancy-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Preexisting Diabetes / GDM; Gestational Age; Preconception Care; Pregnancy Glycemic Targets; Pregnancy Medication Safety; Maternal / Fetal Monitoring; Delivery Context; Postpartum Follow-Up. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "pediatricDiabetes": {
    "title": "Pediatric Diabetes",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-pediatric-diabetes",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-pediatric-diabetes",
      "version": "0.2.0",
      "name": "PediatricDiabetes",
      "title": "Pediatric Diabetes Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing pediatric diabetes within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "pediatric-diabetes-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/pediatric-diabetes-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "pediatric-diabetes-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "2014-09-03"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/pediatric-diabetes-example",
          "resource": {
            "resourceType": "Condition",
            "id": "pediatric-diabetes-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-pediatric-diabetes"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "pediatric-diabetes",
                  "display": "Pediatric Diabetes"
                }
              ],
              "text": "Pediatric Diabetes"
            },
            "subject": {
              "reference": "Patient/pediatric-diabetes-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Growth / Puberty; Parent / Caregiver Role; School / Day-Care Context; Developmental / Psychosocial Needs; Transition to Adult Care; Age-Appropriate Targets. Standard terminology bindings should be refined in a formal implementation guide."
              },
              {
                "text": "The pediatric context is derived from the linked Patient demographics; this profile does not make age a coded disease subtype."
              }
            ]
          }
        }
      ]
    }
  },
  "olderAdultDiabetes": {
    "title": "Older Adult Diabetes",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-older-adult-diabetes",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-older-adult-diabetes",
      "version": "0.2.0",
      "name": "OlderAdultDiabetes",
      "title": "Older Adult Diabetes Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing older adult diabetes within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "older-adult-diabetes-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/older-adult-diabetes-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "older-adult-diabetes-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1944-02-18"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/older-adult-diabetes-example",
          "resource": {
            "resourceType": "Condition",
            "id": "older-adult-diabetes-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-older-adult-diabetes"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "older-adult-diabetes",
                  "display": "Older Adult Diabetes"
                }
              ],
              "text": "Older Adult Diabetes"
            },
            "subject": {
              "reference": "Patient/older-adult-diabetes-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Cognitive Status; Functional Status; Frailty; Hypoglycemia Vulnerability; Polypharmacy; Treatment Burden; Caregiver / Social Support; Treatment Simplification. Standard terminology bindings should be refined in a formal implementation guide."
              },
              {
                "text": "The older-adult context is derived from the linked Patient demographics and should not be interpreted as a distinct diabetes diagnosis code."
              }
            ]
          }
        }
      ]
    }
  },
  "inpatientDiabetes": {
    "title": "Inpatient Diabetes",
    "resource": "Encounter",
    "baseUrl": "https://hl7.org/fhir/R4/encounter.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-inpatient-diabetes",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-inpatient-diabetes",
      "version": "0.2.0",
      "name": "InpatientDiabetes",
      "title": "Inpatient Diabetes Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing inpatient diabetes within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Encounter",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Encounter",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Encounter",
            "path": "Encounter",
            "mustSupport": true
          },
          {
            "id": "Encounter.status",
            "path": "Encounter.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Encounter.class",
            "path": "Encounter.class",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Encounter.type",
            "path": "Encounter.type",
            "mustSupport": true
          },
          {
            "id": "Encounter.serviceType",
            "path": "Encounter.serviceType",
            "mustSupport": true
          },
          {
            "id": "Encounter.subject",
            "path": "Encounter.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Encounter.period",
            "path": "Encounter.period",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Encounter.reasonCode",
            "path": "Encounter.reasonCode",
            "mustSupport": true
          },
          {
            "id": "Encounter.reasonReference",
            "path": "Encounter.reasonReference",
            "mustSupport": true
          },
          {
            "id": "Encounter.diagnosis",
            "path": "Encounter.diagnosis",
            "mustSupport": true
          },
          {
            "id": "Encounter.hospitalization",
            "path": "Encounter.hospitalization",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "inpatient-diabetes-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/inpatient-diabetes-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "inpatient-diabetes-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/inpatient-diabetes-example-diabetes",
          "resource": {
            "resourceType": "Condition",
            "id": "inpatient-diabetes-example-diabetes",
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "code": {
              "text": "Diabetes mellitus requiring inpatient management"
            },
            "subject": {
              "reference": "Patient/inpatient-diabetes-patient"
            },
            "onsetDateTime": "2018-03-12"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Encounter/inpatient-diabetes-example",
          "resource": {
            "resourceType": "Encounter",
            "id": "inpatient-diabetes-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-inpatient-diabetes"
              ]
            },
            "status": "finished",
            "class": {
              "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
              "code": "IMP",
              "display": "inpatient encounter"
            },
            "type": [
              {
                "coding": [
                  {
                    "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                    "code": "inpatient-diabetes",
                    "display": "Inpatient Diabetes"
                  }
                ],
                "text": "Inpatient Diabetes"
              }
            ],
            "subject": {
              "reference": "Patient/inpatient-diabetes-patient"
            },
            "period": {
              "start": "2026-08-08T13:00:00+05:30",
              "end": "2026-08-11T11:00:00+05:30"
            },
            "reasonReference": [
              {
                "reference": "Condition/inpatient-diabetes-example-diabetes"
              }
            ],
            "diagnosis": [
              {
                "condition": {
                  "reference": "Condition/inpatient-diabetes-example-diabetes"
                },
                "rank": 1
              }
            ]
          }
        }
      ]
    }
  },
  "vitalsAnthropometrics": {
    "title": "Vitals & Anthropometrics",
    "resource": "Observation",
    "baseUrl": "https://hl7.org/fhir/R4/observation.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-vitals-anthropometrics",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-vitals-anthropometrics",
      "version": "0.2.0",
      "name": "VitalsAnthropometrics",
      "title": "Vitals & Anthropometrics Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing vitals & anthropometrics within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Observation",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Observation",
            "path": "Observation",
            "mustSupport": true
          },
          {
            "id": "Observation.status",
            "path": "Observation.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.category",
            "path": "Observation.category",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.code",
            "path": "Observation.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer LOINC for quantitative or panel observations and SNOMED CT for coded clinical findings when an appropriate concept exists."
            }
          },
          {
            "id": "Observation.subject",
            "path": "Observation.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Observation.effective[x]",
            "path": "Observation.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.method",
            "path": "Observation.method",
            "mustSupport": true
          },
          {
            "id": "Observation.device",
            "path": "Observation.device",
            "mustSupport": true
          },
          {
            "id": "Observation.value[x]",
            "path": "Observation.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.interpretation",
            "path": "Observation.interpretation",
            "mustSupport": true
          },
          {
            "id": "Observation.referenceRange",
            "path": "Observation.referenceRange",
            "mustSupport": true
          },
          {
            "id": "Observation.component",
            "path": "Observation.component",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Observation.component.code",
            "path": "Observation.component.code",
            "mustSupport": true
          },
          {
            "id": "Observation.component.value[x]",
            "path": "Observation.component.value[x]",
            "mustSupport": true
          },
          {
            "id": "Observation.note",
            "path": "Observation.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "vitals-anthropometrics-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/vitals-anthropometrics-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "vitals-anthropometrics-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/vitals-anthropometrics-example",
          "resource": {
            "resourceType": "Observation",
            "id": "vitals-anthropometrics-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-vitals-anthropometrics"
              ]
            },
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "survey",
                    "display": "Survey"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "vitals-anthropometrics",
                  "display": "Vitals & Anthropometrics"
                }
              ],
              "text": "Vitals & Anthropometrics"
            },
            "subject": {
              "reference": "Patient/vitals-anthropometrics-patient"
            },
            "effectiveDateTime": "2026-08-11T09:00:00+05:30",
            "method": {
              "text": "Illustrative diabetes assessment / monitoring method"
            },
            "component": [
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "blood-pressure",
                      "display": "Blood Pressure"
                    }
                  ],
                  "text": "Blood Pressure"
                },
                "valueString": "132/78 mmHg"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "height",
                      "display": "Height"
                    }
                  ],
                  "text": "Height"
                },
                "valueString": "Illustrative height value"
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "weight",
                      "display": "Weight"
                    }
                  ],
                  "text": "Weight"
                },
                "valueQuantity": {
                  "value": 78.4,
                  "unit": "kg",
                  "system": "http://unitsofmeasure.org",
                  "code": "kg"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "bmi",
                      "display": "BMI"
                    }
                  ],
                  "text": "BMI"
                },
                "valueQuantity": {
                  "value": 28.7,
                  "unit": "kg/m2",
                  "system": "http://unitsofmeasure.org",
                  "code": "kg/m2"
                }
              },
              {
                "code": {
                  "coding": [
                    {
                      "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                      "code": "waist-circumference",
                      "display": "Waist Circumference"
                    }
                  ],
                  "text": "Waist Circumference"
                },
                "valueString": "Illustrative waist circumference value"
              }
            ],
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Use LOINC for measurable observations and SNOMED CT for coded findings where appropriate."
              }
            ]
          }
        }
      ]
    }
  },
  "laboratoryData": {
    "title": "Laboratory Data",
    "resource": "DiagnosticReport",
    "baseUrl": "https://hl7.org/fhir/R4/diagnosticreport.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-laboratory-data",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-laboratory-data",
      "version": "0.2.0",
      "name": "LaboratoryData",
      "title": "Laboratory Data Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing laboratory data within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "DiagnosticReport",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/DiagnosticReport",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "DiagnosticReport",
            "path": "DiagnosticReport",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.basedOn",
            "path": "DiagnosticReport.basedOn",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.status",
            "path": "DiagnosticReport.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.category",
            "path": "DiagnosticReport.category",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.code",
            "path": "DiagnosticReport.code",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.subject",
            "path": "DiagnosticReport.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "DiagnosticReport.effective[x]",
            "path": "DiagnosticReport.effective[x]",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.issued",
            "path": "DiagnosticReport.issued",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.performer",
            "path": "DiagnosticReport.performer",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.resultsInterpreter",
            "path": "DiagnosticReport.resultsInterpreter",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.result",
            "path": "DiagnosticReport.result",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Observation"
                ]
              }
            ]
          },
          {
            "id": "DiagnosticReport.conclusion",
            "path": "DiagnosticReport.conclusion",
            "mustSupport": true
          },
          {
            "id": "DiagnosticReport.presentedForm",
            "path": "DiagnosticReport.presentedForm",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "laboratory-data-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/laboratory-data-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "laboratory-data-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-1",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-1",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "a1c",
                  "display": "A1C"
                }
              ],
              "text": "A1C"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueQuantity": {
              "value": 7.2,
              "unit": "%",
              "system": "http://unitsofmeasure.org",
              "code": "%"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-2",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-2",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "plasma-glucose",
                  "display": "Plasma Glucose"
                }
              ],
              "text": "Plasma Glucose"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueQuantity": {
              "value": 154,
              "unit": "mg/dL",
              "system": "http://unitsofmeasure.org",
              "code": "mg/dL"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-3",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-3",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "lipid-panel",
                  "display": "Lipid Panel"
                }
              ],
              "text": "Lipid Panel"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative lipid panel value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-4",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-4",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "creatinine",
                  "display": "Creatinine"
                }
              ],
              "text": "Creatinine"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative creatinine value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-5",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-5",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "egfr",
                  "display": "eGFR"
                }
              ],
              "text": "eGFR"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueQuantity": {
              "value": 82,
              "unit": "mL/min/1.73 m2",
              "system": "http://unitsofmeasure.org",
              "code": "mL/min/{1.73_m2}"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-6",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-6",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "urine-albumin-uacr",
                  "display": "Urine Albumin / UACR"
                }
              ],
              "text": "Urine Albumin / UACR"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueQuantity": {
              "value": 24,
              "unit": "mg/g",
              "system": "http://unitsofmeasure.org",
              "code": "mg/g"
            }
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-7",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-7",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "electrolytes",
                  "display": "Electrolytes"
                }
              ],
              "text": "Electrolytes"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative electrolytes value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-8",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-8",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "bmp-cmp",
                  "display": "BMP / CMP"
                }
              ],
              "text": "BMP / CMP"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative bmp / cmp value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Observation/laboratory-data-example-result-9",
          "resource": {
            "resourceType": "Observation",
            "id": "laboratory-data-example-result-9",
            "status": "final",
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                    "code": "laboratory",
                    "display": "Laboratory"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "liver-tests",
                  "display": "Liver Tests"
                }
              ],
              "text": "Liver Tests"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "valueString": "Illustrative liver tests value"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/DiagnosticReport/laboratory-data-example",
          "resource": {
            "resourceType": "DiagnosticReport",
            "id": "laboratory-data-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-laboratory-data"
              ]
            },
            "status": "final",
            "category": [
              {
                "text": "Diabetes assessment"
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "laboratory-data",
                  "display": "Laboratory Data"
                }
              ],
              "text": "Laboratory Data"
            },
            "subject": {
              "reference": "Patient/laboratory-data-patient"
            },
            "effectiveDateTime": "2026-08-11T08:45:00+05:30",
            "issued": "2026-08-11T09:10:00+05:30",
            "result": [
              {
                "reference": "Observation/laboratory-data-example-result-1"
              },
              {
                "reference": "Observation/laboratory-data-example-result-2"
              },
              {
                "reference": "Observation/laboratory-data-example-result-3"
              },
              {
                "reference": "Observation/laboratory-data-example-result-4"
              },
              {
                "reference": "Observation/laboratory-data-example-result-5"
              },
              {
                "reference": "Observation/laboratory-data-example-result-6"
              },
              {
                "reference": "Observation/laboratory-data-example-result-7"
              },
              {
                "reference": "Observation/laboratory-data-example-result-8"
              },
              {
                "reference": "Observation/laboratory-data-example-result-9"
              }
            ],
            "conclusion": "Illustrative laboratory data summary; interpret in clinical context."
          }
        }
      ]
    }
  },
  "generalConditions": {
    "title": "General Conditions",
    "resource": "Condition",
    "baseUrl": "https://hl7.org/fhir/R4/condition.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-general-conditions",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-general-conditions",
      "version": "0.2.0",
      "name": "GeneralConditions",
      "title": "General Conditions Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing general conditions within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "Condition",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Condition",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "Condition",
            "path": "Condition",
            "mustSupport": true
          },
          {
            "id": "Condition.clinicalStatus",
            "path": "Condition.clinicalStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.verificationStatus",
            "path": "Condition.verificationStatus",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "Condition.category",
            "path": "Condition.category",
            "mustSupport": true
          },
          {
            "id": "Condition.code",
            "path": "Condition.code",
            "min": 1,
            "mustSupport": true,
            "binding": {
              "strength": "preferred",
              "description": "Prefer SNOMED CT for diabetes diagnoses, complications, or clinically asserted conditions when an appropriate concept exists."
            }
          },
          {
            "id": "Condition.subject",
            "path": "Condition.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "Condition.onset[x]",
            "path": "Condition.onset[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.abatement[x]",
            "path": "Condition.abatement[x]",
            "mustSupport": true
          },
          {
            "id": "Condition.recordedDate",
            "path": "Condition.recordedDate",
            "mustSupport": true
          },
          {
            "id": "Condition.severity",
            "path": "Condition.severity",
            "mustSupport": true
          },
          {
            "id": "Condition.bodySite",
            "path": "Condition.bodySite",
            "mustSupport": true
          },
          {
            "id": "Condition.evidence",
            "path": "Condition.evidence",
            "mustSupport": true
          },
          {
            "id": "Condition.note",
            "path": "Condition.note",
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "general-conditions-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/general-conditions-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "general-conditions-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Condition/general-conditions-example",
          "resource": {
            "resourceType": "Condition",
            "id": "general-conditions-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-general-conditions"
              ]
            },
            "clinicalStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  "code": "active",
                  "display": "Active"
                }
              ]
            },
            "verificationStatus": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                  "code": "confirmed",
                  "display": "Confirmed"
                }
              ]
            },
            "category": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                    "code": "problem-list-item",
                    "display": "Problem List Item"
                  }
                ]
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "https://example.org/fhir/CodeSystem/mcdia-clinical-concept",
                  "code": "general-conditions",
                  "display": "General Conditions"
                }
              ],
              "text": "General Conditions"
            },
            "subject": {
              "reference": "Patient/general-conditions-patient"
            },
            "onsetDateTime": "2026-01-15",
            "recordedDate": "2026-08-11",
            "note": [
              {
                "text": "Illustrative mC(Dia)DE example. Graph coverage: Hypertension; Dyslipidemia; Obesity; ASCVD; Heart Failure; Chronic Kidney Disease; MASLD; Sleep Apnea; Thyroid Disease; Celiac Disease; Mental Health Conditions. Standard terminology bindings should be refined in a formal implementation guide."
              }
            ]
          }
        }
      ]
    }
  },
  "generalPatientContext": {
    "title": "General Patient Context",
    "resource": "QuestionnaireResponse",
    "baseUrl": "https://hl7.org/fhir/R4/questionnaireresponse.html",
    "profile": {
      "resourceType": "StructureDefinition",
      "id": "mcdia-general-patient-context",
      "url": "https://example.org/fhir/StructureDefinition/mcdia-general-patient-context",
      "version": "0.2.0",
      "name": "GeneralPatientContext",
      "title": "General Patient Context Profile",
      "status": "draft",
      "experimental": true,
      "date": "2026-08-11",
      "publisher": "Illustrative Diabetes Common Clinical Data Elements (mC(Dia)DE)",
      "description": "An mCODE-inspired FHIR R4 profile for representing general patient context within the diabetes common clinical model.",
      "purpose": "Prototype only. This profile follows an mCODE-inspired profile-first approach by constraining the closest FHIR R4 base resource and identifying interoperable elements for the diabetes common clinical model.",
      "fhirVersion": "4.0.1",
      "kind": "resource",
      "abstract": false,
      "type": "QuestionnaireResponse",
      "baseDefinition": "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse",
      "derivation": "constraint",
      "differential": {
        "element": [
          {
            "id": "QuestionnaireResponse",
            "path": "QuestionnaireResponse",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.questionnaire",
            "path": "QuestionnaireResponse.questionnaire",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.status",
            "path": "QuestionnaireResponse.status",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.subject",
            "path": "QuestionnaireResponse.subject",
            "min": 1,
            "mustSupport": true,
            "type": [
              {
                "code": "Reference",
                "targetProfile": [
                  "http://hl7.org/fhir/StructureDefinition/Patient"
                ]
              }
            ]
          },
          {
            "id": "QuestionnaireResponse.encounter",
            "path": "QuestionnaireResponse.encounter",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.authored",
            "path": "QuestionnaireResponse.authored",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.author",
            "path": "QuestionnaireResponse.author",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.source",
            "path": "QuestionnaireResponse.source",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item",
            "path": "QuestionnaireResponse.item",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.linkId",
            "path": "QuestionnaireResponse.item.linkId",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.text",
            "path": "QuestionnaireResponse.item.text",
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer",
            "path": "QuestionnaireResponse.item.answer",
            "min": 1,
            "mustSupport": true
          },
          {
            "id": "QuestionnaireResponse.item.answer.value[x]",
            "path": "QuestionnaireResponse.item.answer.value[x]",
            "min": 1,
            "mustSupport": true
          }
        ]
      }
    },
    "bundle": {
      "resourceType": "Bundle",
      "id": "general-patient-context-example-bundle",
      "type": "collection",
      "entry": [
        {
          "fullUrl": "https://example.org/fhir/Patient/general-patient-context-patient",
          "resource": {
            "resourceType": "Patient",
            "id": "general-patient-context-patient",
            "name": [
              {
                "use": "official",
                "family": "Example",
                "given": [
                  "Asha"
                ]
              }
            ],
            "gender": "female",
            "birthDate": "1972-05-14"
          }
        },
        {
          "fullUrl": "https://example.org/fhir/Questionnaire/general-patient-context-example-form",
          "resource": {
            "resourceType": "Questionnaire",
            "id": "general-patient-context-example-form",
            "url": "https://example.org/fhir/Questionnaire/general-patient-context-example-form",
            "status": "active",
            "title": "General Patient Context Questionnaire",
            "subjectType": [
              "Patient"
            ],
            "item": [
              {
                "linkId": "q1",
                "text": "Pregnancy Status",
                "type": "string"
              },
              {
                "linkId": "q2",
                "text": "Tobacco Use",
                "type": "string"
              },
              {
                "linkId": "q3",
                "text": "General Medication List",
                "type": "string"
              },
              {
                "linkId": "q4",
                "text": "Allergy / Intolerance",
                "type": "string"
              },
              {
                "linkId": "q5",
                "text": "Immunization Status",
                "type": "string"
              }
            ]
          }
        },
        {
          "fullUrl": "https://example.org/fhir/QuestionnaireResponse/general-patient-context-example",
          "resource": {
            "resourceType": "QuestionnaireResponse",
            "id": "general-patient-context-example",
            "meta": {
              "profile": [
                "https://example.org/fhir/StructureDefinition/mcdia-general-patient-context"
              ]
            },
            "questionnaire": "https://example.org/fhir/Questionnaire/general-patient-context-example-form",
            "status": "completed",
            "subject": {
              "reference": "Patient/general-patient-context-patient"
            },
            "authored": "2026-08-11T09:00:00+05:30",
            "source": {
              "reference": "Patient/general-patient-context-patient"
            },
            "item": [
              {
                "linkId": "q1",
                "text": "Pregnancy Status",
                "answer": [
                  {
                    "valueString": "Illustrative response for pregnancy status"
                  }
                ]
              },
              {
                "linkId": "q2",
                "text": "Tobacco Use",
                "answer": [
                  {
                    "valueString": "Illustrative response for tobacco use"
                  }
                ]
              },
              {
                "linkId": "q3",
                "text": "General Medication List",
                "answer": [
                  {
                    "valueString": "Illustrative response for general medication list"
                  }
                ]
              },
              {
                "linkId": "q4",
                "text": "Allergy / Intolerance",
                "answer": [
                  {
                    "valueString": "Illustrative response for allergy / intolerance"
                  }
                ]
              },
              {
                "linkId": "q5",
                "text": "Immunization Status",
                "answer": [
                  {
                    "valueString": "Illustrative response for immunization status"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
};
