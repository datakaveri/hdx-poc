// Ported near-verbatim from the standalone diabetes_mCxDE_v6_fhirImaging.html
// concept-graph prototype (see ../../../../../../diabetes_mCxDE_v6_fhirImaging.html).
// Data only; rendering lives in mcxde-graph.ts.

export type ConceptType =
  | 'patient'
  | 'disease'
  | 'assessment'
  | 'tech'
  | 'treatment'
  | 'outcome'
  | 'context'
  | 'external'
  | 'element'
  | 'value';

export interface ConceptNode {
  id: string;
  name: string;
  type: ConceptType;
  children?: ConceptNode[];
  expandable?: string | null;
  fhirSample?: string | null;
  rootClickable?: boolean;
}

export interface DetailGraph {
  title: string;
  type: ConceptType;
  data: ConceptNode;
  crossLinks: [string, string, string][];
}

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
        id: "patient",
        name: "Diabetes Patient",
        type: "patient",
        children: [
          {
            id: "disease",
            name: "Disease",
            type: "disease",
            expandable: "disease",
            children: [
              { id: "dc", name: "Diabetes Condition", type: "disease", fhirSample: "diabetesCondition" },
              { id: "dclass", name: "Diabetes Classification", type: "disease" },
              { id: "dxa", name: "Diagnostic Assessment", type: "disease" },
              { id: "eta", name: "Etiology Assessment", type: "disease" },
              { id: "dstate", name: "Disease State / Course", type: "disease" },
              { id: "t1stage", name: "Type 1 Diabetes Stage", type: "disease" },
              { id: "predm", name: "Prediabetes / High-Risk Glycemia", type: "disease" },
              { id: "dac", name: "Diabetes-Associated Complication", type: "disease", expandable: "complications" },
              { id: "kdd", name: "Kidney Disease in Diabetes", type: "disease" },
              { id: "ret", name: "Diabetic Retinopathy", type: "disease" },
              { id: "neuro", name: "Diabetic Neuropathy", type: "disease" },
              { id: "footd", name: "Diabetes-Related Foot Disease", type: "disease" }
            ]
          },
          {
            id: "assessment",
            name: "Assessment",
            type: "assessment",
            expandable: "assessment",
            children: [
              { id: "glya", name: "Glycemic Assessment", type: "assessment", fhirSample: "glycemicAssessment" },
              { id: "hyprisk", name: "Hypoglycemia Risk Assessment", type: "assessment" },
              { id: "kha", name: "Kidney Health Assessment", type: "assessment" },
              { id: "eye", name: "Eye Health Assessment", type: "assessment", fhirSample: "eyeHealthAssessment" },
              { id: "neura", name: "Neuropathy Assessment", type: "assessment" },
              { id: "footr", name: "Foot Risk Assessment", type: "assessment" },
              { id: "cvra", name: "Cardiovascular / Cardiorenal Risk", type: "assessment" },
              { id: "waa", name: "Weight & Adiposity Assessment", type: "assessment" },
              { id: "comorb", name: "Comorbidity Assessment", type: "assessment" },
              { id: "self", name: "Self-Management Assessment", type: "assessment" },
              { id: "psy", name: "Psychosocial / Behavioral Health", type: "assessment" },
              { id: "func", name: "Functional & Cognitive Assessment", type: "assessment" },
              { id: "soc", name: "Social Needs & Access Assessment", type: "assessment" },
              { id: "repro", name: "Reproductive / Pregnancy Assessment", type: "assessment" }
            ]
          },
          {
            id: "tech",
            name: "Monitoring & Technology",
            type: "tech",
            expandable: "tech",
            children: [
              { id: "bgm", name: "Blood Glucose Monitoring", type: "tech" },
              { id: "cgm", name: "Continuous Glucose Monitoring", type: "tech", fhirSample: "continuousGlucoseMonitoring" },
              { id: "ket", name: "Ketone Monitoring", type: "tech" },
              { id: "idd", name: "Insulin Delivery Device", type: "tech" },
              { id: "aid", name: "Automated Insulin Delivery", type: "tech" }
            ]
          },
          {
            id: "treatment",
            name: "Treatment",
            type: "treatment",
            expandable: "treatment",
            children: [
              { id: "care", name: "Diabetes Management Plan", type: "treatment", fhirSample: "diabetesManagementPlan" },
              { id: "medtx", name: "Medication Therapy", type: "treatment" },
              { id: "medadm", name: "Medication Administration", type: "treatment" },
              { id: "insreg", name: "Insulin Regimen", type: "treatment" },
              { id: "life", name: "Lifestyle & Behavioral Therapy", type: "treatment" },
              { id: "dsmes", name: "DSM Education & Support", type: "treatment" },
              { id: "wgttx", name: "Weight Management Intervention", type: "treatment" },
              { id: "proc", name: "Diabetes / Metabolic Procedure", type: "treatment" }
            ]
          },
          {
            id: "outcome",
            name: "Outcomes",
            type: "outcome",
            expandable: "outcome",
            children: [
              { id: "glyst", name: "Glycemic Status", type: "outcome" },
              { id: "hypo", name: "Hypoglycemia Event", type: "outcome" },
              { id: "hgc", name: "Hyperglycemic Crisis", type: "outcome" },
              { id: "compst", name: "Complication Status", type: "outcome" },
              { id: "rem", name: "Remission Status", type: "outcome" },
              { id: "txresp", name: "Treatment Response", type: "outcome" },
              { id: "pro", name: "Patient-Reported Outcome", type: "outcome" }
            ]
          },
          {
            id: "context",
            name: "Special Clinical Contexts",
            type: "context",
            expandable: "context",
            children: [
              { id: "preg", name: "Diabetes in Pregnancy", type: "context" },
              { id: "ped", name: "Pediatric Diabetes", type: "context" },
              { id: "older", name: "Older Adult Diabetes", type: "context" },
              { id: "inpat", name: "Inpatient Diabetes", type: "context" }
            ]
          },
          {
            id: "external",
            name: "External / Common Clinical Concepts",
            type: "external",
            expandable: "external"
          }
        ]
      };


      export const detailGraphs: Record<string, DetailGraph> = {
        disease: {
          title: "Disease",
          type: "disease",
          data: {
            id: "disease_root", name: "Disease", type: "disease", rootClickable: true,
            children: [
              node("dc2", "Diabetes Condition", "disease", [
                leaf("dc_date", "Diagnosis / Asserted Date"), leaf("dc_onset", "Onset Date / Estimated Onset"),
                leaf("dc_status", "Clinical Status"), leaf("dc_duration", "Disease Duration"),
                leaf("dc_classref", "Classification"), leaf("dc_etioref", "Etiology"),
                leaf("dc_comp", "Related Complication(s)")
              ], null, "diabetesCondition"),
              node("dclass2", "Diabetes Classification", "disease", [
                node("dclass_type", "Diabetes Type", "element", [
                  value("t1d", "Type 1 Diabetes"), value("t2d", "Type 2 Diabetes"), value("gdm", "Gestational Diabetes"),
                  value("mono", "Monogenic Diabetes"), value("exo", "Exocrine Pancreatic Diabetes"),
                  value("drug", "Drug / Chemical-Induced Diabetes"), value("otherdm", "Other Specific Diabetes"),
                  value("uncdm", "Uncertain / Mixed Classification")
                ]),
                leaf("dclass_cert", "Classification Certainty"), leaf("dclass_pheno", "Clinical Phenotype")
              ]),
              node("dxa2", "Diabetes Diagnostic Assessment", "disease", [
                node("dx_method", "Diagnostic Method", "element", [
                  value("dx_a1c", "A1C Evidence"), value("dx_fpg", "Fasting Plasma Glucose"),
                  value("dx_ogtt", "Oral Glucose Tolerance"), value("dx_random", "Random Plasma Glucose"),
                  value("dx_other", "Other Diagnostic Evidence")
                ]),
                leaf("dx_date", "Assessment Date"), leaf("dx_sym", "Symptoms / Clinical Context"),
                leaf("dx_confirm", "Confirmation Status"), leaf("dx_interp", "Interpretation")
              ]),
              node("eta2", "Diabetes Etiology Assessment", "disease", [
                leaf("eta_auto", "Autoimmune Evidence"), leaf("eta_beta", "Beta-Cell Function"),
                leaf("eta_gen", "Genetic Evidence"), leaf("eta_panc", "Pancreatic Disease / Injury"),
                leaf("eta_med", "Medication / Exposure"), leaf("eta_pheno", "Insulin Resistance / Phenotype"),
                leaf("eta_other", "Other Etiologic Evidence")
              ]),
              node("dstate2", "Diabetes Disease State / Course", "disease", [
                leaf("ds_state", "Disease State"),
                node("ds_traj", "Disease Trajectory", "element", [value("ds_stable", "Stable"), value("ds_improve", "Improving"), value("ds_progress", "Progressing")]),
                leaf("ds_duration", "Duration"), leaf("ds_prog", "Progression"),
                leaf("ds_remission", "Remission / Recurrence"), leaf("ds_date", "Assessment Date")
              ]),
              node("t1stage2", "Type 1 Diabetes Stage", "disease", [
                node("t1_stage", "Stage", "element", [value("t1_s1", "Stage 1"), value("t1_s2", "Stage 2"), value("t1_s3", "Stage 3")]),
                leaf("t1_ab", "Islet Autoantibody Status"), leaf("t1_gly", "Glycemic State"),
                leaf("t1_sym", "Symptoms"), leaf("t1_date", "Stage Date")
              ]),
              node("predm2", "Prediabetes / High-Risk Glycemia", "disease", [
                leaf("pre_crit", "Diagnostic Criteria"), leaf("pre_date", "Assessment Date"),
                leaf("pre_risk", "Progression Risk"), leaf("pre_traj", "Trajectory"), leaf("pre_status", "Current Status")
              ]),
              node("dac2", "Diabetes-Associated Complication", "disease", [
                leaf("dac_type", "Complication Type"), leaf("dac_onset", "Onset Date"), leaf("dac_status", "Clinical Status"),
                leaf("dac_sev", "Severity"), leaf("dac_attr", "Diabetes Attribution"), leaf("dac_evid", "Supporting Evidence")
              ], "complications")
            ]
          },
          crossLinks: [
            ["dclass2", "dc2", "classifies"], ["dxa2", "dc2", "supports diagnosis"],
            ["eta2", "dclass2", "supports classification"], ["dstate2", "dc2", "describes course"],
            ["t1stage2", "dstate2", "specialized state"], ["predm2", "dc2", "may progress to"],
            ["dc2", "dac2", "may have"]
          ]
        },

        complications: {
          title: "Diabetes Complications",
          type: "disease",
          data: {
            id: "comp_root", name: "Diabetes-Associated Complication", type: "disease", rootClickable: true,
            children: [
              node("kdd2", "Kidney Disease in Diabetes", "disease", [
                leaf("kd_ckd", "CKD Status"), leaf("kd_gfr", "GFR Category"), leaf("kd_alb", "Albuminuria Category"),
                leaf("kd_prog", "Progression"), leaf("kd_kf", "Kidney Failure"),
                leaf("kd_krt", "Kidney Replacement Therapy"), leaf("kd_etio", "Etiology / Attribution")
              ]),
              node("ret2", "Diabetic Retinopathy", "disease", [
                leaf("ret_type", "Retinopathy Type"), leaf("ret_sev", "Severity / Stage"), leaf("ret_lat", "Laterality"),
                leaf("ret_dme", "Macular Edema"), leaf("ret_vt", "Vision-Threatening Status"), leaf("ret_tx", "Treatment Status")
              ]),
              node("neuro2", "Diabetic Neuropathy", "disease", [
                leaf("n_type", "Neuropathy Type"), leaf("n_site", "Body Site"), leaf("n_sym", "Symptoms"),
                leaf("n_sev", "Severity"), leaf("n_lops", "Loss of Protective Sensation"), leaf("n_comp", "Associated Complication")
              ]),
              node("footd2", "Diabetes-Related Foot Disease", "disease", [
                leaf("fd_ulcer", "Ulcer"), leaf("fd_inf", "Infection"), leaf("fd_isch", "Ischemia / PAD"),
                leaf("fd_char", "Charcot Neuroarthropathy"), leaf("fd_amp", "Amputation"), leaf("fd_lat", "Laterality"),
                leaf("fd_loc", "Location"), leaf("fd_sev", "Severity"), leaf("fd_heal", "Healing Status")
              ])
            ]
          },
          crossLinks: []
        },

        assessment: {
          title: "Assessment",
          type: "assessment",
          data: {
            id: "assessment_root", name: "Assessment", type: "assessment", rootClickable: true,
            children: [
              node("glya2", "Glycemic Assessment", "assessment", [
                leaf("ga_period", "Assessment Period"), leaf("ga_a1c", "A1C"), leaf("ga_bgm", "BGM Summary"),
                node("ga_cgm", "CGM Summary", "element", [
                  value("ga_mean", "Mean Glucose"), value("ga_gmi", "Glucose Management Indicator"),
                  value("ga_tir", "Time in Range"), value("ga_tbr", "Time Below Range"),
                  value("ga_tar", "Time Above Range"), value("ga_var", "Glucose Variability")
                ]),
                leaf("ga_alt", "Alternative Glycemic Marker"), leaf("ga_target", "Individual Glycemic Target"), leaf("ga_trend", "Glycemic Trend")
              ], null, "glycemicAssessment"),
              node("hyprisk2", "Hypoglycemia Risk Assessment", "assessment", [
                leaf("hr_prior", "Prior Hypoglycemia"), leaf("hr_aware", "Hypoglycemia Awareness"),
                leaf("hr_med", "Medication-Related Risk"), leaf("hr_renal", "Kidney / Liver Risk"),
                leaf("hr_cog", "Cognitive / Functional Risk"), leaf("hr_food", "Food / Social Risk"),
                leaf("hr_rescue", "Rescue Preparedness"), leaf("hr_level", "Overall Risk")
              ]),
              node("kha2", "Kidney Health Assessment", "assessment", [
                leaf("kh_creat", "Serum Creatinine"), leaf("kh_egfr", "eGFR"), leaf("kh_uacr", "Urine Albumin-to-Creatinine Ratio"),
                leaf("kh_gfr", "GFR Category"), leaf("kh_alb", "Albuminuria Category"), leaf("kh_trend", "Kidney Function Trend"), leaf("kh_date", "Assessment Date")
              ]),
              node("eye2", "Eye Health Assessment", "assessment", [
                leaf("ey_method", "Exam Method"), leaf("ey_date", "Exam Date"), leaf("ey_va", "Visual Acuity"),
                leaf("ey_ret", "Retinal Findings"), leaf("ey_lat", "Laterality"), leaf("ey_mac", "Macular Findings"), leaf("ey_ref", "Referral / Follow-Up")
              ], null, "eyeHealthAssessment"),
              node("neura2", "Neuropathy Assessment", "assessment", [
                leaf("na_sym", "Neuropathic Symptoms"), leaf("na_mono", "Monofilament"), leaf("na_vib", "Vibration"),
                leaf("na_reflex", "Reflexes"), leaf("na_sens", "Other Sensory Testing"), leaf("na_auto", "Autonomic Findings"), leaf("na_date", "Assessment Date")
              ]),
              node("footr2", "Foot Risk Assessment", "assessment", [
                leaf("fr_skin", "Skin Integrity"), leaf("fr_def", "Deformity"), leaf("fr_lops", "Protective Sensation"),
                leaf("fr_pulse", "Pedal Pulses / Perfusion"), leaf("fr_ulcer", "Prior Ulcer"), leaf("fr_amp", "Prior Amputation"),
                leaf("fr_risk", "Foot Risk Category"), leaf("fr_freq", "Recommended Follow-Up")
              ]),
              node("cvra2", "Cardiovascular / Cardiorenal Risk Assessment", "assessment", [
                leaf("cv_bp", "Blood Pressure"), leaf("cv_lip", "Lipids"), leaf("cv_smoke", "Tobacco Exposure"),
                leaf("cv_ascvd", "ASCVD History"), leaf("cv_hf", "Heart Failure"), leaf("cv_ckd", "Kidney Disease"),
                leaf("cv_risk", "Calculated / Clinical Risk"), leaf("cv_date", "Assessment Date")
              ]),
              node("waa2", "Weight & Adiposity Assessment", "assessment", [
                leaf("wa_weight", "Weight"), leaf("wa_bmi", "BMI"), leaf("wa_waist", "Waist Circumference"),
                leaf("wa_traj", "Weight Trajectory"), leaf("wa_target", "Weight Goal"), leaf("wa_clin", "Clinical Significance")
              ]),
              node("comorb2", "Comorbidity Assessment", "assessment", [
                leaf("co_present", "Condition Present"), leaf("co_absent", "Condition Absent"), leaf("co_status", "Condition Status"),
                leaf("co_relev", "Clinical Relevance"), leaf("co_method", "Assessment Method")
              ]),
              node("self2", "Diabetes Self-Management Assessment", "assessment", [
                leaf("sm_med", "Medication-Taking"), leaf("sm_mon", "Glucose Monitoring"), leaf("sm_nut", "Nutrition Skills"),
                leaf("sm_act", "Physical Activity"), leaf("sm_ins", "Insulin Skills"), leaf("sm_dev", "Device Skills"),
                leaf("sm_hypo", "Hypoglycemia Skills"), leaf("sm_sick", "Sick-Day / Ketone Skills"), leaf("sm_dsmes", "DSMES Need")
              ]),
              node("psy2", "Psychosocial / Behavioral Health Assessment", "assessment", [
                leaf("ps_dist", "Diabetes Distress"), leaf("ps_dep", "Depressive Symptoms"), leaf("ps_anx", "Anxiety"),
                leaf("ps_eat", "Disordered Eating"), leaf("ps_fear", "Fear of Hypoglycemia"), leaf("ps_burden", "Treatment Burden"), leaf("ps_support", "Psychosocial Support")
              ]),
              node("func2", "Functional & Cognitive Assessment", "assessment", [
                leaf("fu_cog", "Cognition"), leaf("fu_adl", "Activities of Daily Living"), leaf("fu_iadl", "Instrumental ADLs"),
                leaf("fu_frail", "Frailty"), leaf("fu_fall", "Falls / Mobility"), leaf("fu_self", "Self-Management Capacity"), leaf("fu_care", "Caregiver Support")
              ]),
              node("soc2", "Social Needs & Access Assessment", "assessment", [
                leaf("so_food", "Food Security"), leaf("so_hous", "Housing Stability"), leaf("so_fin", "Financial Strain"),
                leaf("so_cov", "Coverage / Insurance"), leaf("so_med", "Medication Access"), leaf("so_sup", "Device / Supply Access"),
                leaf("so_lit", "Health Literacy"), leaf("so_lang", "Language Needs"), leaf("so_trans", "Transportation"), leaf("so_support", "Social Support")
              ]),
              node("repro2", "Reproductive / Pregnancy Assessment", "assessment", [
                leaf("rp_status", "Pregnancy Status"), leaf("rp_intent", "Pregnancy Intention"), leaf("rp_contra", "Contraception"),
                leaf("rp_precon", "Preconception Status"), leaf("rp_ga", "Gestational Age"), leaf("rp_post", "Postpartum Status")
              ])
            ]
          },
          crossLinks: []
        },

        tech: {
          title: "Monitoring & Technology",
          type: "tech",
          data: {
            id: "tech_root", name: "Monitoring & Technology", type: "tech", rootClickable: true,
            children: [
              node("bgm2", "Blood Glucose Monitoring", "tech", [
                leaf("bg_method", "Monitoring Method"), leaf("bg_device", "Device"), leaf("bg_time", "Date / Time"),
                node("bg_context", "Measurement Context", "element", [value("bg_fast", "Fasting"), value("bg_pre", "Pre-Meal"), value("bg_post", "Post-Meal"), value("bg_bed", "Bedtime"), value("bg_other", "Other Context")]),
                leaf("bg_value", "Glucose Result")
              ]),
              node("cgm2", "Continuous Glucose Monitoring", "tech", [
                leaf("cg_device", "CGM Device / Method"), leaf("cg_start", "Use Start / Stop"), leaf("cg_period", "Reporting Period"),
                leaf("cg_wear", "Sensor Wear / Data Sufficiency"), leaf("cg_mean", "Mean Glucose"), leaf("cg_gmi", "GMI"),
                leaf("cg_tir", "Time in Range"), leaf("cg_tbr", "Time Below Range"), leaf("cg_tar", "Time Above Range"),
                leaf("cg_cv", "Glucose Variability"), leaf("cg_events", "Glucose Events / Patterns")
              ], null, "continuousGlucoseMonitoring"),
              node("ket2", "Ketone Monitoring", "tech", [
                leaf("ke_type", "Blood / Urine"), leaf("ke_method", "Method"), leaf("ke_value", "Ketone Result"),
                leaf("ke_time", "Date / Time"), leaf("ke_context", "Clinical Context"), leaf("ke_interp", "Interpretation")
              ]),
              node("idd2", "Insulin Delivery Device", "tech", [
                leaf("id_type", "Device Type"), leaf("id_ins", "Insulin"), leaf("id_start", "Start / Stop"),
                leaf("id_basal", "Basal Settings"), leaf("id_bolus", "Bolus Settings"), leaf("id_icr", "Insulin-to-Carbohydrate Ratio"),
                leaf("id_isf", "Insulin Sensitivity / Correction Factor"), leaf("id_target", "Target Glucose"), leaf("id_status", "Device Status")
              ]),
              node("aid2", "Automated Insulin Delivery", "tech", [
                leaf("ai_system", "AID System"), leaf("ai_mode", "Automation Mode"), leaf("ai_cgm", "CGM Integration"),
                leaf("ai_target", "Algorithm Target"), leaf("ai_auto", "Time in Automation"), leaf("ai_deliv", "Insulin Delivery Summary"), leaf("ai_exit", "Override / Exit Information")
              ])
            ]
          },
          crossLinks: [["cgm2", "aid2", "sensor input"], ["idd2", "aid2", "delivery platform"]]
        },

        treatment: {
          title: "Treatment",
          type: "treatment",
          data: {
            id: "treatment_root", name: "Treatment", type: "treatment", rootClickable: true,
            children: [
              node("care2", "Diabetes Management Plan", "treatment", [
                leaf("cp_gly", "Glycemic Goals"), leaf("cp_weight", "Weight Goals"), leaf("cp_mon", "Monitoring Plan"),
                leaf("cp_med", "Medication Plan"), leaf("cp_life", "Lifestyle Plan"), leaf("cp_hypo", "Hypoglycemia Safety Plan"),
                leaf("cp_sick", "Sick-Day / Ketone Plan"), leaf("cp_ref", "Referral Plan"), leaf("cp_follow", "Follow-Up Plan")
              ], null, "diabetesManagementPlan"),
              node("medtx2", "Diabetes-Related Medication Therapy", "treatment", [
                leaf("mt_med", "Medication"), leaf("mt_reason", "Indication / Reason"),
                node("mt_intent", "Treatment Intent", "element", [value("mt_gly", "Glycemic"), value("mt_weight", "Weight"), value("mt_cv", "Cardiovascular"), value("mt_renal", "Kidney"), value("mt_other", "Other")]),
                leaf("mt_dose", "Dose"), leaf("mt_route", "Route"), leaf("mt_freq", "Frequency"), leaf("mt_start", "Start Date"),
                leaf("mt_status", "Status"), leaf("mt_change", "Reason for Start / Change / Stop"), leaf("mt_ae", "Adverse Effects / Tolerance")
              ]),
              node("medadm2", "Diabetes-Related Medication Administration", "treatment", [
                leaf("ma_med", "Medication"), leaf("ma_dose", "Dose"), leaf("ma_route", "Route"), leaf("ma_time", "Administration Time"),
                leaf("ma_status", "Status"), leaf("ma_reason", "Status Reason")
              ]),
              node("insreg2", "Insulin Regimen", "treatment", [
                leaf("ir_basal", "Basal Insulin"), leaf("ir_prand", "Prandial Insulin"), leaf("ir_corr", "Correction Insulin"),
                leaf("ir_tdd", "Total Daily Dose"), leaf("ir_icr", "Insulin-to-Carbohydrate Ratio"), leaf("ir_isf", "Correction Factor"),
                leaf("ir_target", "Target Glucose"), leaf("ir_method", "Delivery Method"), leaf("ir_sched", "Timing / Schedule")
              ]),
              node("life2", "Lifestyle & Behavioral Therapy", "treatment", [
                leaf("lt_nut", "Nutrition Therapy"), leaf("lt_act", "Physical Activity"), leaf("lt_sleep", "Sleep / Lifestyle"),
                leaf("lt_behav", "Behavioral Strategies"), leaf("lt_goal", "Goal"), leaf("lt_freq", "Frequency / Duration"), leaf("lt_status", "Participation / Status")
              ]),
              node("dsmes2", "Diabetes Self-Management Education & Support", "treatment", [
                leaf("de_topic", "Education Topic"), leaf("de_goal", "Learning Goal"), leaf("de_method", "Education Method"),
                leaf("de_med", "Medication Skills"), leaf("de_mon", "Monitoring Skills"), leaf("de_nut", "Nutrition Skills"),
                leaf("de_hypo", "Hypoglycemia Skills"), leaf("de_sick", "Sick-Day Skills"), leaf("de_device", "Technology / Device Training"),
                leaf("de_result", "Understanding / Completion")
              ]),
              node("wgttx2", "Weight Management Intervention", "treatment", [
                leaf("wt_strategy", "Treatment Strategy"), leaf("wt_target", "Weight Target"), leaf("wt_life", "Lifestyle Component"),
                leaf("wt_med", "Medication Component"), leaf("wt_proc", "Procedure Component"), leaf("wt_response", "Response")
              ]),
              node("proc2", "Diabetes / Metabolic Procedure", "treatment", [
                leaf("pr_type", "Procedure Type"), leaf("pr_reason", "Indication"), leaf("pr_date", "Procedure Date"), leaf("pr_status", "Status"), leaf("pr_out", "Outcome")
              ])
            ]
          },
          crossLinks: [
            ["care2", "medtx2", "includes"], ["care2", "insreg2", "includes"], ["care2", "life2", "includes"],
            ["care2", "dsmes2", "includes"], ["care2", "wgttx2", "includes"], ["care2", "proc2", "includes"],
            ["medtx2", "medadm2", "may result in"]
          ]
        },

        outcome: {
          title: "Outcomes",
          type: "outcome",
          data: {
            id: "outcome_root", name: "Outcomes", type: "outcome", rootClickable: true,
            children: [
              node("glyst2", "Glycemic Status", "outcome", [
                leaf("gs_period", "Assessment Period"), leaf("gs_evid", "Evidence Type"), leaf("gs_target", "Target"),
                leaf("gs_ach", "Target Achievement"), leaf("gs_trend", "Trend")
              ]),
              node("hypo2", "Hypoglycemia Event", "outcome", [
                leaf("he_time", "Date / Time"), leaf("he_glu", "Glucose Value"), leaf("he_level", "Severity / Level"),
                leaf("he_sym", "Symptoms"), leaf("he_assist", "Assistance Required"), leaf("he_treat", "Treatment Given"),
                leaf("he_cause", "Precipitating Factor"), leaf("he_out", "Outcome")
              ]),
              node("hgc2", "Hyperglycemic Crisis", "outcome", [
                node("hc_type", "Crisis Type", "element", [value("hc_dka", "DKA"), value("hc_hhs", "HHS"), value("hc_mix", "Mixed DKA / HHS")]),
                leaf("hc_date", "Date / Time"), leaf("hc_glu", "Glucose"), leaf("hc_ket", "Ketosis"), leaf("hc_acid", "Acid-Base Status"),
                leaf("hc_osm", "Osmolality / Hydration"), leaf("hc_sev", "Severity"), leaf("hc_cause", "Precipitating Factor"),
                leaf("hc_setting", "Care Setting"), leaf("hc_res", "Resolution")
              ]),
              node("compst2", "Diabetes Complication Status", "outcome", [
                leaf("cs_ref", "Complication Reference"), leaf("cs_evid", "Evidence"), leaf("cs_state", "Status"),
                node("cs_trend", "Trend", "element", [value("cs_stable", "Stable"), value("cs_improve", "Improving"), value("cs_prog", "Progressing"), value("cs_res", "Resolved / Recurrent")]),
                leaf("cs_date", "Assessment Date")
              ]),
              node("rem2", "Diabetes Remission Status", "outcome", [
                leaf("rm_status", "Remission Status"), leaf("rm_start", "Start Date"), leaf("rm_gly", "Glycemic Evidence"),
                leaf("rm_med", "Glucose-Lowering Medication Status"), leaf("rm_duration", "Duration"), leaf("rm_rec", "Recurrence")
              ]),
              node("txresp2", "Treatment Response", "outcome", [
                node("tr_domain", "Response Domain", "element", [value("tr_gly", "Glycemic"), value("tr_weight", "Weight"), value("tr_cv", "Cardiovascular"), value("tr_kid", "Kidney"), value("tr_sym", "Symptoms / Function")]),
                leaf("tr_base", "Baseline"), leaf("tr_follow", "Follow-Up"), leaf("tr_change", "Change / Response"), leaf("tr_tol", "Tolerance / Safety")
              ]),
              node("pro2", "Patient-Reported Diabetes Outcome", "outcome", [
                leaf("po_qol", "Quality of Life"), leaf("po_sat", "Treatment Satisfaction"), leaf("po_burden", "Treatment Burden"),
                leaf("po_dist", "Diabetes Distress"), leaf("po_func", "Daily Function"), leaf("po_date", "Assessment Date")
              ])
            ]
          },
          crossLinks: []
        },

        context: {
          title: "Special Clinical Contexts",
          type: "context",
          data: {
            id: "context_root", name: "Special Clinical Contexts", type: "context", rootClickable: true,
            children: [
              node("preg2", "Diabetes in Pregnancy", "context", [
                leaf("pg_type", "Preexisting Diabetes / GDM"), leaf("pg_ga", "Gestational Age"), leaf("pg_pre", "Preconception Care"),
                leaf("pg_target", "Pregnancy Glycemic Targets"), leaf("pg_med", "Pregnancy Medication Safety"), leaf("pg_fetal", "Maternal / Fetal Monitoring"),
                leaf("pg_del", "Delivery Context"), leaf("pg_post", "Postpartum Follow-Up")
              ]),
              node("ped2", "Pediatric Diabetes", "context", [
                leaf("pd_grow", "Growth / Puberty"), leaf("pd_care", "Parent / Caregiver Role"), leaf("pd_school", "School / Day-Care Context"),
                leaf("pd_psy", "Developmental / Psychosocial Needs"), leaf("pd_trans", "Transition to Adult Care"), leaf("pd_target", "Age-Appropriate Targets")
              ]),
              node("older2", "Older Adult Diabetes", "context", [
                leaf("oa_cog", "Cognitive Status"), leaf("oa_func", "Functional Status"), leaf("oa_frail", "Frailty"),
                leaf("oa_hypo", "Hypoglycemia Vulnerability"), leaf("oa_poly", "Polypharmacy"), leaf("oa_burden", "Treatment Burden"),
                leaf("oa_support", "Caregiver / Social Support"), leaf("oa_simpl", "Treatment Simplification")
              ]),
              node("inpat2", "Inpatient Diabetes", "context", [
                leaf("ip_type", "Known Diabetes / Stress Hyperglycemia"), leaf("ip_adm", "Admission Context"), leaf("ip_nut", "Nutrition Status"),
                leaf("ip_gly", "Inpatient Glycemic Status"), leaf("ip_mon", "Monitoring Plan"), leaf("ip_ins", "Insulin / Medication Plan"),
                leaf("ip_crisis", "DKA / HHS"), leaf("ip_trans", "Discharge / Transition Plan")
              ])
            ]
          },
          crossLinks: []
        },

        external: {
          title: "External / Common Clinical Concepts",
          type: "external",
          data: {
            id: "external_root", name: "External / Common Clinical Concepts", type: "external", rootClickable: true,
            children: [
              node("ext_v", "Vitals & Anthropometrics", "external", [
                leaf("ex_bp", "Blood Pressure"), leaf("ex_height", "Height"), leaf("ex_weight", "Weight"), leaf("ex_bmi", "BMI"), leaf("ex_waist", "Waist Circumference")
              ]),
              node("ext_lab", "Laboratory Data", "external", [
                leaf("ex_a1c", "A1C"), leaf("ex_glu", "Plasma Glucose"), leaf("ex_lipid", "Lipid Panel"), leaf("ex_creat", "Creatinine"),
                leaf("ex_egfr", "eGFR"), leaf("ex_uacr", "Urine Albumin / UACR"), leaf("ex_elec", "Electrolytes"),
                leaf("ex_bmp", "BMP / CMP"), leaf("ex_liver", "Liver Tests")
              ]),
              node("ext_cond", "General Conditions", "external", [
                leaf("ex_htn", "Hypertension"), leaf("ex_dyslip", "Dyslipidemia"), leaf("ex_obes", "Obesity"), leaf("ex_ascvd", "ASCVD"),
                leaf("ex_hf", "Heart Failure"), leaf("ex_ckd", "Chronic Kidney Disease"), leaf("ex_masld", "MASLD"), leaf("ex_osa", "Sleep Apnea"),
                leaf("ex_thy", "Thyroid Disease"), leaf("ex_celiac", "Celiac Disease"), leaf("ex_mh", "Mental Health Conditions")
              ]),
              node("ext_soc", "General Patient Context", "external", [
                leaf("ex_preg", "Pregnancy Status"), leaf("ex_tob", "Tobacco Use"), leaf("ex_meds", "General Medication List"),
                leaf("ex_allergy", "Allergy / Intolerance"), leaf("ex_imm", "Immunization Status")
              ])
            ]
          },
          crossLinks: []
        }
      };

