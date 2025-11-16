import { Download, ExternalLink, Calendar, FileText, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PromiseScholarshipPage = () => {
  return (
    <div style={{ color: '#333', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <header style={{ background: 'linear-gradient(90deg, #A8D5BA, #DAA520)', padding: '10px' }}>
        <h1>Georgia Promise Scholarship Information Guide</h1>
      </header>
      <section>
        <h2>Quick Facts</h2>
        <ul>
          <li><Download /> Download PDF Guide</li>
          <li><ExternalLink /> Learn more about the scholarship</li>
          <li><Calendar /> Application Timeline</li>
          <li><FileText /> Document Requirements</li>
        </ul>
      </section>
      <section>
        <h2>2025 Application Timeline</h2>
        <ul>
          <li>Q1: Application opens</li>
          <li>Q2: Application deadline</li>
          <li>Q4: Award announcements</li>
        </ul>
      </section>
      <section>
        <h2>How to Apply</h2>
        <p>Follow these steps to apply:</p>
        <ol>
          <li>Step 1: Prepare documents</li>
          <li>Step 2: Complete the online application</li>
          <li>Step 3: Submit your application</li>
        </ol>
      </section>
      <section>
        <h2>Eligible Expenses Breakdown</h2>
        <p>Details about eligible expenses...</p>
      </section>
      <section>
        <h2>Eligible Schools</h2>
        <ul>
          <li>School 1</li>
          <li>School 2</li>
          <li>School 3</li>
          <li>School 4</li>
          <li>School 5</li>
          <li>School 6</li>
          <li>School 7</li>
          <li>School 8</li>
          <li>School 9</li>
          <li>School 10</li>
          <li>School 11</li>
          <li>School 12</li>
          <li>School 13</li>
          <li>School 14</li>
          <li>School 15</li>
          <li>School 16</li>
          <li>School 17</li>
          <li>School 18</li>
        </ul>
      </section>
      <footer>
        <p><Phone /> Contact us</p>
        <p><Mail /> Email us</p>
        <button style={{ background: '#DAA520' }}>Print Guide</button>
        <Link href="/register">Back to Registration</Link>
      </footer>
    </div>
  );
};

export default PromiseScholarshipPage;