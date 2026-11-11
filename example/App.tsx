import { Iframe } from "@bounceapp/iframe"
import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

const pages = {
  "Bounce careers": "https://bounce.com/careers",
  "example.com": "https://example.com",
}
type PageName = keyof typeof pages

export default function App() {
  const [name, setName] = useState<PageName>("Bounce careers")
  const [reloads, setReloads] = useState(0)
  const [log, setLog] = useState<string[]>([])

  const uri = pages[name]

  const append = (entry: string) =>
    setLog(previous => [
      `${new Date().toLocaleTimeString()}  ${entry}`,
      ...previous.slice(0, 7),
    ])

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>@bounceapp/iframe</Text>

        <View style={styles.row}>
          {(Object.keys(pages) as PageName[]).map(option => (
            <Chip
              key={option}
              label={option}
              selected={option === name}
              onPress={() => setName(option)}
            />
          ))}
          <Chip label="Reload" onPress={() => setReloads(count => count + 1)} />
        </View>

        <View style={styles.stage}>
          <Iframe
            key={`${uri}-${reloads}`}
            uri={uri}
            style={styles.iframe}
            onLoadEnd={() => append(`loaded ${uri}`)}
          />
        </View>

        <View style={styles.log}>
          <Text style={styles.logTitle}>Events</Text>
          {log.map((entry, index) => (
            <Text key={`${index}-${entry}`} style={styles.logEntry}>
              {entry}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

type ChipProps = {
  label: string
  selected?: boolean
  onPress: () => void
}

const Chip = ({ label, selected, onPress }: ChipProps) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected]}>
    <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
      {label}
    </Text>
  </Pressable>
)

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", paddingTop: 48 },
  content: {
    alignItems: "center",
    alignSelf: "center",
    gap: 16,
    padding: 24,
    width: "100%",
    maxWidth: 640,
  },
  title: { fontSize: 20, fontWeight: "600" },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  stage: {
    alignSelf: "stretch",
    height: 420,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f4f4f5",
  },
  iframe: { width: "100%", height: "100%" },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#d4d4d8",
  },
  chipSelected: { backgroundColor: "#18181b", borderColor: "#18181b" },
  chipLabel: { color: "#18181b" },
  chipLabelSelected: { color: "#fff" },
  log: { alignSelf: "stretch", gap: 4 },
  logTitle: { fontWeight: "600" },
  logEntry: { fontFamily: "monospace", fontSize: 12, color: "#52525b" },
})
