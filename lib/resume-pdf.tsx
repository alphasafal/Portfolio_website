import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { SITE } from "./constants";
import projects from "@/content/projects.json";
import experience from "@/content/experience.json";
import skills from "@/content/skills.json";

const accent = "#8b7cff";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#09090b",
    color: "#fafafa",
    padding: 48,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
    paddingBottom: 16,
  },
  name: { fontSize: 26, fontWeight: "bold", color: accent, marginBottom: 4 },
  title: { fontSize: 11, color: "#a1a1aa", marginBottom: 8, lineHeight: 1.4 },
  contact: { fontSize: 9, color: "#a1a1aa", marginBottom: 2 },
  section: { marginTop: 18 },
  sectionTitle: {
    fontSize: 10,
    color: accent,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  body: { fontSize: 9.5, lineHeight: 1.55, color: "#d4d4d8" },
  skill: {
    fontSize: 8.5,
    color: "#a1a1aa",
    backgroundColor: "#18181b",
    padding: "3 7",
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  skillRow: { flexDirection: "row", flexWrap: "wrap" },
  jobTitle: { fontSize: 10, fontWeight: "bold", color: "#fafafa" },
  jobMeta: { fontSize: 8.5, color: "#a1a1aa", marginTop: 2 },
  bullet: { fontSize: 8.5, color: "#d4d4d8", marginTop: 3, paddingLeft: 8 },
  projectTitle: { fontSize: 10, fontWeight: "bold", color: "#fafafa" },
  projectDesc: { fontSize: 8.5, color: "#a1a1aa", marginTop: 2 },
  projectBlock: { marginBottom: 10 },
});

export function ResumeDocument() {
  const allSkills = skills.categories.flatMap((c) => c.skills);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{SITE.name}</Text>
          <Text style={styles.title}>{SITE.shortTitle}</Text>
          <Text style={styles.contact}>{SITE.email} · {SITE.domain}</Text>
          <Text style={styles.contact}>GitHub: {SITE.social.github}</Text>
          <Text style={styles.contact}>LinkedIn: {SITE.social.linkedin}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.body}>{SITE.oneLiner}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((job) => (
            <View key={job.company} style={{ marginBottom: 10 }}>
              <Text style={styles.jobTitle}>{job.role} — {job.company}</Text>
              <Text style={styles.jobMeta}>{job.period}</Text>
              {job.achievements.slice(0, 2).map((a) => (
                <Text key={a} style={styles.bullet}>· {a}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillRow}>
            {allSkills.map((s) => (
              <Text key={s} style={styles.skill}>{s}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Projects</Text>
          {projects.slice(0, 4).map((p) => (
            <View key={p.slug} style={styles.projectBlock}>
              <Text style={styles.projectTitle}>{p.title}</Text>
              <Text style={styles.projectDesc}>{p.impact}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <Link src={SITE.url} style={{ fontSize: 9, color: accent }}>
            {SITE.url}
          </Link>
        </View>
      </Page>
    </Document>
  );
}
