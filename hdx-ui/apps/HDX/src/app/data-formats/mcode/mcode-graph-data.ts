// Ported near-verbatim from DiabeticGlaucoma/mCODE_STU4_cancer.html.
// This source embeds no worked FHIR StructureDefinition/Bundle examples
// (its fhirSamples map is empty), so mcode-fhir-samples.ts is empty too.

import { ConceptNode, ConceptType, DetailGraph } from '../concept-graph/concept-graph.types';

function node(
  id: string,
  name: string,
  type: ConceptType,
  children: ConceptNode[],
  expandable: string | null = null,
  fhirSample: string | null = null,
): ConceptNode {
  return { id, name, type, children, expandable, fhirSample };
}
function leaf(id: string, name: string): ConceptNode {
  return { id, name, type: 'element' };
}
function value(id: string, name: string): ConceptNode {
  return { id, name, type: 'value' };
}

      export const master: ConceptNode = {
        id: "cancer_patient",
        name: "Cancer Patient",
        type: "patient",
        expandable: "patient",
        children: [
          {
            id: "disease",
            name: "Disease",
            type: "disease",
            expandable: "disease",
            children: [
              { id: "cancer_stage", name: "Cancer Stage", type: "disease" },
              { id: "lymphoma_stage", name: "Lymphoma Stage", type: "disease" },
              { id: "tnm_stage_group", name: "TNM Stage Group", type: "disease" },
              { id: "t_category", name: "T Category", type: "disease" },
              { id: "n_category", name: "N Category", type: "disease" },
              { id: "m_category", name: "M Category", type: "disease" },
              { id: "cancer_risk", name: "Cancer Risk Assessment", type: "disease" },
              { id: "rhabdo_risk", name: "Rhabdomyosarcoma Risk Assessment", type: "disease" },
              { id: "all_risk", name: "ALL Risk Assessment", type: "disease" },
              { id: "primary_cancer", name: "Primary Cancer Condition", type: "disease" },
              { id: "secondary_cancer", name: "Secondary Cancer Condition", type: "disease" },
              { id: "hist_grade", name: "Histologic Grade", type: "disease" },
              { id: "hist_behavior", name: "Histologic Behavior and Type", type: "disease" },
              { id: "tumor_morphology", name: "Tumor Morphology", type: "disease" },
              { id: "tumor_marker", name: "Tumor Marker Test", type: "disease" }
            ]
          },
          {
            id: "assessment",
            name: "Assessment",
            type: "assessment",
            expandable: "assessment",
            children: [
              { id: "bsa", name: "Body Surface Area", type: "assessment" },
              { id: "history_metastatic", name: "History of Metastatic Cancer", type: "assessment" },
              { id: "comorbidities", name: "Comorbidities", type: "assessment" },
              { id: "performance", name: "ECOG / Karnofsky / Lansky Play Performance Status", type: "assessment" },
              { id: "deauville", name: "Deauville Scale", type: "assessment" }
            ]
          },
          {
            id: "genomics",
            name: "Genomics",
            type: "genomics",
            expandable: "genomics",
            children: [
              { id: "genomic_variant", name: "Genomic Variant", type: "genomics" },
              { id: "genomics_report", name: "Genomics Report", type: "genomics" },
              { id: "genomic_region", name: "Genomic Region Studied", type: "genomics" }
            ]
          },
          {
            id: "treatment",
            name: "Treatment",
            type: "treatment",
            expandable: "treatment",
            children: [
              { id: "med_request", name: "Cancer-Related Medication Request", type: "treatment" },
              { id: "med_admin", name: "Cancer-Related Medication Administration", type: "treatment" },
              { id: "surgery", name: "Cancer-Related Surgical Procedure", type: "treatment" },
              { id: "rt_course", name: "Radiotherapy Course Summary", type: "treatment" },
              { id: "rt_volume", name: "Radiotherapy Volume", type: "treatment" }
            ]
          },
          {
            id: "outcome",
            name: "Outcome",
            type: "outcome",
            expandable: "outcome",
            children: [
              { id: "tumor_size", name: "Tumor Size", type: "outcome" },
              { id: "tumor", name: "Tumor", type: "outcome" },
              { id: "disease_status", name: "Disease Status", type: "outcome" }
            ]
          },
          {
            id: "external",
            name: "External Profiles",
            type: "external",
            expandable: "external",
            children: [
              { id: "blood_pressure", name: "Blood Pressure", type: "external" },
              { id: "height", name: "Height", type: "external" },
              { id: "weight", name: "Weight", type: "external" },
              { id: "cmp", name: "CMP", type: "external" },
              { id: "cbc", name: "CBC", type: "external" }
            ]
          }
        ]
      };


      export const detailGraphs: Record<string, DetailGraph> = {
        patient: {
          title: "Patient",
          type: "patient",
          data: {
            id: "patient_root", name: "Patient", type: "patient", rootClickable: true,
            children: [
              node("cancer_patient_profile", "Cancer Patient", "patient", [
                leaf("pt_name", "Name"),
                leaf("pt_contact", "Contact Info"),
                leaf("pt_birth", "Birth Date"),
                leaf("pt_gender", "Gender"),
                leaf("pt_zip", "Zip Code"),
                leaf("pt_race", "US Core Race"),
                leaf("pt_birth_sex", "US Core Birth Sex"),
                leaf("pt_ethnicity", "US Core Ethnicity"),
                leaf("pt_death", "Death Date")
              ]),
              node("human_specimen_profile", "Human Specimen", "patient", [
                leaf("spec_identifier", "Identifier"),
                leaf("spec_collection", "Collection Site"),
                leaf("spec_type", "Specimen Type")
              ])
            ]
          },
          crossLinks: [
            ["human_specimen_profile", "cancer_patient_profile", "subject"]
          ]
        },

        disease: {
          title: "Disease",
          type: "disease",
          data: {
            id: "disease_root", name: "Disease", type: "disease", rootClickable: true,
            children: [
              node("cancer_stage_profile", "Cancer Stage", "disease", [
                leaf("stage_method", "Staging Method"),
                leaf("stage_type", "Stage Type")
              ]),
              node("lymphoma_stage_profile", "Lymphoma Stage", "disease", []),
              node("tnm_stage_profile", "TNM Stage Group", "disease", [
                node("t_category_profile", "T Category", "disease", []),
                node("n_category_profile", "N Category", "disease", []),
                node("m_category_profile", "M Category", "disease", [])
              ]),
              node("cancer_risk_profile", "Cancer Risk Assessment", "disease", [
                leaf("risk_method", "Risk Method"),
                leaf("risk_type", "Risk Type"),
                node("rhabdo_risk_profile", "Rhabdomyosarcoma Risk Assessment", "disease", []),
                node("all_risk_profile", "ALL Risk Assessment", "disease", [])
              ]),
              node("primary_cancer_profile", "Primary Cancer Condition", "disease", [
                leaf("primary_asserted", "Asserted Date"),
                leaf("primary_histology", "Histology / Morphology"),
                leaf("primary_body_site", "Body Site"),
                leaf("primary_laterality", "Laterality"),
                leaf("primary_location", "Location Qualifier"),
                leaf("primary_related", "Related Condition")
              ]),
              node("secondary_cancer_profile", "Secondary Cancer Condition", "disease", []),
              node("hist_grade_profile", "Histologic Grade", "disease", []),
              node("hist_behavior_profile", "Histologic Behavior and Type", "disease", []),
              node("tumor_morphology_profile", "Tumor Morphology", "disease", []),
              node("tumor_marker_profile", "Tumor Marker Test", "disease", [
                leaf("marker_type", "Test Type"),
                leaf("marker_value", "Result Value")
              ])
            ]
          },
          crossLinks: [
            ["lymphoma_stage_profile", "cancer_stage_profile", "specialized stage"],
            ["tnm_stage_profile", "cancer_stage_profile", "has member"],
            ["cancer_stage_profile", "primary_cancer_profile", "stages"],
            ["cancer_risk_profile", "primary_cancer_profile", "assesses"],
            ["secondary_cancer_profile", "primary_cancer_profile", "related condition"],
            ["hist_grade_profile", "tumor_morphology_profile", "result"],
            ["hist_behavior_profile", "tumor_morphology_profile", "result"],
            ["tumor_morphology_profile", "primary_cancer_profile", "describes"],
            ["tumor_marker_profile", "primary_cancer_profile", "supports"]
          ]
        },

        assessment: {
          title: "Assessment",
          type: "assessment",
          data: {
            id: "assessment_root", name: "Assessment", type: "assessment", rootClickable: true,
            children: [
              node("bsa_profile", "Body Surface Area", "assessment", []),
              node("metastatic_profile", "History of Metastatic Cancer", "assessment", []),
              node("comorbidities_profile", "Comorbidities", "assessment", [
                leaf("condition_present", "Condition Present"),
                leaf("condition_absent", "Condition Absent")
              ]),
              node("performance_profile", "ECOG / Karnofsky / Lansky Play Performance Status", "assessment", [
                leaf("performance_method", "Method"),
                leaf("performance_risk", "Risk Score"),
                leaf("performance_score", "Score"),
                leaf("performance_interpretation", "Interpretation")
              ]),
              node("deauville_profile", "Deauville Scale", "assessment", [
                leaf("deauville_score", "Score"),
                leaf("deauville_interpretation", "Interpretation")
              ])
            ]
          },
          crossLinks: []
        },

        genomics: {
          title: "Genomics",
          type: "genomics",
          data: {
            id: "genomics_root", name: "Genomics", type: "genomics", rootClickable: true,
            children: [
              node("genomic_variant_profile", "Genomic Variant", "genomics", [
                leaf("variant_present", "Present / Absent"),
                leaf("variation_code", "Variation Code"),
                leaf("variation_hgvs", "Variation HGVS"),
                leaf("coding_change", "Coding Change Type"),
                leaf("protein_hgvs", "Protein HGVS"),
                leaf("amino_acid", "Amino Acid Change Type"),
                leaf("molecular_consequence", "Molecular Consequence"),
                leaf("cytogen_nomenclature", "Cytogen. Nomenclature"),
                leaf("gene_studied_variant", "Gene Studied"),
                leaf("genomic_source", "Genomic Source Class"),
                leaf("copy_number", "Copy Number"),
                leaf("allelic_frequency", "Allelic Frequency"),
                leaf("allelic_state", "Allelic State"),
                leaf("cytogen_location", "Cytogenetic Location")
              ]),
              node("genomics_report_profile", "Genomics Report", "genomics", [
                leaf("genomics_test_code", "Test Code")
              ]),
              node("genomic_region_profile", "Genomic Region Studied", "genomics", [
                leaf("gene_mutations", "Gene Mutations"),
                leaf("gene_studied_region", "Gene Studied"),
                leaf("coordinate_system", "Coordinate System"),
                leaf("ranges_examined", "Ranges Examined"),
                leaf("region_description", "Region Description"),
                leaf("reference_sequence", "Reference Sequence")
              ])
            ]
          },
          crossLinks: [
            ["genomic_variant_profile", "genomics_report_profile", "result"],
            ["genomic_region_profile", "genomics_report_profile", "result"]
          ]
        },

        treatment: {
          title: "Treatment",
          type: "treatment",
          data: {
            id: "treatment_root", name: "Treatment", type: "treatment", rootClickable: true,
            children: [
              node("med_request_profile", "Cancer-Related Medication Request", "treatment", [
                leaf("mr_medication", "Medication"),
                leaf("mr_reason", "Reason"),
                leaf("mr_intent", "Procedure Intent"),
                leaf("mr_status", "Status Reason"),
                leaf("mr_normalization", "Normalization Basis")
              ]),
              node("med_admin_profile", "Cancer-Related Medication Administration", "treatment", [
                leaf("ma_medication", "Medication"),
                leaf("ma_reason", "Reason"),
                leaf("ma_intent", "Procedure Intent"),
                leaf("ma_status", "Status Reason"),
                leaf("ma_normalization", "Normalization Basis")
              ]),
              node("surgery_profile", "Cancer-Related Surgical Procedure", "treatment", [
                leaf("surgery_code", "Procedure Code"),
                leaf("surgery_site", "Body Site"),
                leaf("surgery_laterality", "Laterality"),
                leaf("surgery_location", "Location Qualifier")
              ]),
              node("rt_course_profile", "Radiotherapy Course Summary", "treatment", [
                leaf("rt_sessions", "No. Sessions"),
                leaf("rt_modality_technique", "Modality / Technique"),
                leaf("rt_modality", "Modality"),
                leaf("rt_technique", "Technique"),
                leaf("rt_doses", "Doses Delivered"),
                leaf("rt_total_dose", "Total Dose"),
                leaf("rt_fractions", "No. Fractions"),
                leaf("rt_body_volume", "Body Volume")
              ]),
              node("rt_volume_profile", "Radiotherapy Volume", "treatment", [
                leaf("rt_volume_type", "Volume Type"),
                leaf("rt_volume_location", "Location"),
                leaf("rt_volume_qualifier", "Location Qualifier")
              ])
            ]
          },
          crossLinks: [
            ["rt_course_profile", "rt_volume_profile", "body volume"]
          ]
        },

        outcome: {
          title: "Outcome",
          type: "outcome",
          data: {
            id: "outcome_root", name: "Outcome", type: "outcome", rootClickable: true,
            children: [
              node("tumor_size_profile", "Tumor Size", "outcome", [
                leaf("tumor_size_method", "Method"),
                leaf("longest_dimension", "Longest Dimension"),
                leaf("other_dimension", "Other Dimension")
              ]),
              node("tumor_profile", "Tumor", "outcome", [
                leaf("tumor_identifier", "Tumor Identifier"),
                leaf("tumor_location", "Body Location")
              ]),
              node("disease_status_profile", "Disease Status", "outcome", [
                leaf("disease_evidence", "Evidence Type")
              ])
            ]
          },
          crossLinks: [
            ["tumor_size_profile", "tumor_profile", "measurement"]
          ]
        },

        external: {
          title: "External Profiles",
          type: "external",
          data: {
            id: "external_root", name: "External Profiles", type: "external", rootClickable: true,
            children: [
              node("bp_profile", "Blood Pressure", "external", []),
              node("height_profile", "Height", "external", []),
              node("weight_profile", "Weight", "external", []),
              node("cmp_profile", "CMP", "external", []),
              node("cbc_profile", "CBC", "external", [])
            ]
          },
          crossLinks: []
        }
      };

