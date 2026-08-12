// Ported near-verbatim from the standalone diabetes_mCxDE_v6_fhirImaging.html
// concept-graph prototype's `fhirSamples` map (see mcxde-graph-data.ts).
// These are also what fhir/structure_definitions and fhir/patient_bundles were
// extracted from and uploaded to the FHIR server via fhir/upload.sh.

export interface FhirSample {
  title: string;
  resource: string;
  baseUrl: string;
  profile: Record<string, unknown>;
  bundle: Record<string, unknown>;
}

export const fhirSamples: Record<string, FhirSample> = {
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
  }
};
