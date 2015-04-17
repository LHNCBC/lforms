## What is LForms?
LForms is a light-weight, feature-rich, open-source widget that creates input
forms for Web-based medical applications. It was developed by the National
Library of Medicine (NLM) Lister Hill National Center for Biomedical
Communications (LHNCBC), part of the National Institutes of Health (NIH), with
the collaboration and support from the Regenstrief Institute, Inc. and the LOINC
Committee.

The LForms software is written entirely in JavaScript, using Google’s Angular JS
framework, as well as some widgets developed in-house at NLM. A form is defined
by listing the form questions (e.g. LOINC observations) and incorporating
metadata for each, including: data type, cardinality, default value, units of
measure (if numeric), answer lists (if multiple choice), relationship (in a
hierarchy) to other questions, validation checks, skip logic and help messages.

In LForms, questions can accept multiple answers, and groups of questions or
single questions can repeat. LForms will generate total scores for any set of
questions whose answers have scores (e.g., Glasgow coma score). Form definitions
can be specified as JSON data structures or CSV files. We have used LForms to
generate Web-based forms for many LOINC panels and for AHRQ Patient Safety Event
Reports.

## Installation
LForms installs using the bower package manager (“bower install lforms”).  For a
demo, try the following:
1.  git clone https://github.com/lhncbc/lforms.git
2.  cd lforms
3.  npm install
4.  bower install
5.  grunt serve

## Licensing and Copyright Notice
The LForms software employs the LOINC data model, including LOINC® codes and
LOINC® table which are copyright © 1995-2014, Regenstrief Institute, Inc. and
the Logical Observation Identifiers Names and Codes (LOINC) Committee. The LOINC
Terms of Use and Copyright Notice and License apply. LOINC® is a registered
United States trademark of Regenstrief Institute, Inc.

Please cite as: http://lhncbc.nlm.nih.gov/project/lforms

This software is distributed under the license set forth below, which is based
on the BSD open-source license.

No warranty or indemnification for damages resulting from claims brought by
third parties whose proprietary rights may be infringed by your usage of this
software are provided by any of the owners.

### NIH License
Owner Notice: The Owner of this software, LForms, is the National Institutes of
Health/Department of Health and Human Services, Bethesda, MD, U.S.A. All rights
reserved.

The software includes elements owned by Joyent, Inc., TJ Holowaychuk, Google,
Inc., Kit Cambridge, Kristopher Michael Kowal, jQuery Foundation, Twitter, Inc,
The AngularUI Team, and Karsten Sperling, who have distributed them to NIH under
the MIT open-source license.

Redistribution and use in source and binary forms, with or without modification,
are permitted for commercial and non-commercial purposes and products alike,
provided that the following conditions are met:
* Redistributions of source code shall retain the above Owner Notice, this list
of conditions and the following disclaimer.
* Redistributions in binary form shall reproduce the above Owner Notice, this
list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.
* Neither the names of the National Library of Medicine (NLM), the Lister Hill
National Center for Biomedical Communications (LHNCBC), the National
Institutes of Health (NIH), nor the names of any of the software contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE OWNER AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
OF SUCH DAMAGE.


