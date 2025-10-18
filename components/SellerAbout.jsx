import React, { useState } from 'react';
import { StyleSheet, Text, View, useColorScheme, TextInput, TouchableOpacity, Alert } from 'react-native';
import colors from '../theme/colors';
import { MotiView } from 'moti';

const SellerAbout = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;

  const [suggestion, setSuggestion] = useState('');

  const handleSendSuggestion = () => {
    if (!suggestion.trim()) return Alert.alert('Please write a suggestion.');
    Alert.alert('Thank you!', 'Your suggestion has been sent.');
    setSuggestion('');
  };

  return (
    <View>
      {/* Store Description */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={[styles.section, { backgroundColor: theme.card }]}
      >
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>About the Seller</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Sport Point International specializes in high-quality sports equipment and apparel. We sell athletic wear, footwear, accessories, fitness gear, and outdoor products. Our store ensures premium products with excellent customer service.
        </Text>
      </MotiView>

      {/* Stats */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
        style={[styles.statsRow, { backgroundColor: theme.card }]}
      >
        {[
          { value: '1,254', label: 'Orders' },
          { value: '500+', label: 'Products Listed' },
          { value: 'Jan 2015', label: 'Registered' },
        ].map((stat, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 + 200, type: 'timing', duration: 400 }}
            style={styles.statBox}
          >
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
          </MotiView>
        ))}
      </MotiView>

      {/* Suggestion Box */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 500 }}
        style={[styles.section, { backgroundColor: theme.card }]}
      >
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Send a Suggestion</Text>
        <TextInput
          style={[styles.textInput, { color: theme.textPrimary, borderColor: theme.textSecondary }]}
          placeholder="Type your suggestion..."
          placeholderTextColor={theme.textSecondary}
          value={suggestion}
          onChangeText={setSuggestion}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: colors.primary }]}
          onPress={handleSendSuggestion}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

export default SellerAbout;

const styles = StyleSheet.create({
  section: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    padding: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  description: { fontSize: 14, lineHeight: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 2, textAlign: 'center' },
  textInput: { borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 12, minHeight: 80, textAlignVertical: 'top' },
  sendBtn: { paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  sendText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
