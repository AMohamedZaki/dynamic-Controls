using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

[ComClass(Karyogram.ClassId, Karyogram.InterfaceId, Karyogram.EventsId)]
[Serializable()]
public class Karyogram
{

    // Diese GUIDs stellen die COM-Identitنt für diese Klasse 
    // und ihre COM-Schnittstellen bereit. Wenn Sie sie نndern, kِnnen 
    // vorhandene Clients nicht mehr auf die Klasse zugreifen.
    public const string ClassId = "94832FD7-65E2-412A-A0A7-DCF0C4B80351";
    public const string InterfaceId = "191E70B1-B627-4A2B-88D4-286DF0872BF9";
    public const string EventsId = "CEA0C461-04FA-4960-AF7C-C99C5B1BED56";

    private Karyotype moKaryotype;
    // Private meResolution As ChromosomeData.eResolutionLevel = ChromosomeData.eResolutionLevel.Resolution400Bands

    private Chromosomes mcChromosomes;

    public Karyogram()
    {
    }

    public Karyogram(ref Karyotype Karyotype)
    {
        moKaryotype = Karyotype;
    }

    // Public Sub New(ByVal Karyotype As Karyotype, ByVal Resolution As ChromosomeData.eResolutionLevel)
    // moKaryotype = Karyotype
    // meResolution = Resolution
    // End Sub


    public void addAberration(QualitativeAberration.eAberrationType AberrationType, ref Chromosomes cChromosomes, ref Bands cBands)
    {
        if (AberrationType == QualitativeAberration.eAberrationType.eAddition)
            doAddition(ref cChromosomes(0), ref cBands(0));
        else if (AberrationType == QualitativeAberration.eAberrationType.eDeletionTerminal)
            doDeletionTerminal(ref cChromosomes(0), ref cBands(0));
        else if (AberrationType == QualitativeAberration.eAberrationType.eDeletionNonTerminal)
            doDeletionInterstitial(ref cChromosomes(0), ref cBands(0), ref cBands(1));
        else if (AberrationType == QualitativeAberration.eAberrationType.eDicentric)
            doDicentric(ref cChromosomes(0), ref cBands(0), ref cChromosomes(1), ref cBands(1));
        else if (AberrationType == QualitativeAberration.eAberrationType.eDuplication)
            doDuplication(ref cChromosomes(0), ref cBands(0), ref cBands(1));
        else if (AberrationType == QualitativeAberration.eAberrationType.eInsertionInterChromosomal)
            doInsertionInterChromosomal(ref cChromosomes(0), ref cBands(0), ref cChromosomes(1), ref cBands(1), ref cBands(2));
        else if (AberrationType == QualitativeAberration.eAberrationType.eInsertionIntraChromosomal)
            doInsertionIntraChromosomal(ref cChromosomes(0), ref cBands(0), ref cBands(1), ref cBands(2));
        else if (AberrationType == QualitativeAberration.eAberrationType.eInversion)
            doInversion(ref cChromosomes(0), ref cBands(0), ref cBands(1));
        else if (AberrationType == QualitativeAberration.eAberrationType.eIsomerization)
        {
            Band oBand = new Band(cBands(0).getChromosome + cBands(0).getArm + "10");
            doIsomerisation(ref cChromosomes(0), ref oBand);
        }
        else if (AberrationType == QualitativeAberration.eAberrationType.eIsoDicentric)
            doIsomerisation(ref cChromosomes(0), ref cBands(0));
        else if (AberrationType == QualitativeAberration.eAberrationType.eTranslocation2Chromosomes)
            doTranslocationGeneral(ref cChromosomes(0), ref cBands(0), ref cChromosomes(1), ref cBands(1));
        else if (AberrationType == QualitativeAberration.eAberrationType.eTranslocation2ChromosomesWholeArm)
        {
            Band oBand1 = new Band(cBands(0).getChromosome + cBands(0).getArm + "10");
            Band oBand2 = new Band(cBands(1).getChromosome + cBands(1).getArm + "10");
            doTranslocationWholeArm(ref cChromosomes(0), ref oBand1, ref cChromosomes(1), ref oBand2);
        }
        else if (AberrationType == QualitativeAberration.eAberrationType.eTranslocation3Chromosomes)
            doTranslocation3Chromosomes(ref cChromosomes(0), ref cBands(0), ref cChromosomes(1), ref cBands(1), ref cChromosomes(2), ref cBands(2));
        else if (AberrationType == QualitativeAberration.eAberrationType.eTranslocation4Chromosomes)
            doTranslocation4Chromosomes(ref cChromosomes(0), ref cBands(0), ref cChromosomes(1), ref cBands(1), ref cChromosomes(2), ref cBands(2), ref cChromosomes(3), ref cBands(3));
        else if (AberrationType == QualitativeAberration.eAberrationType.eTricentric)
            doTricentric(ref cChromosomes(0), ref cBands(0), ref cChromosomes(1), ref cBands(1), ref cBands(2), ref cChromosomes(2), ref cBands(3));
        else if (AberrationType == QualitativeAberration.eAberrationType.eTriplication)
            doTriplication(ref cChromosomes(0), ref cBands(0), ref cBands(1));
        else if (AberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeGain)
            doWholeChromosomeGain(ref cChromosomes(0));
        else if (AberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeLoss)
            doWholeChromosomeLoss(ref cChromosomes(0));
    }

    private void doAddition(ref Chromosome oChromosome, ref Band oBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;
        int i;

        if (oChromosome.CausingAberration == null)
        {
            oAberration = new Aberration("add(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.causesOneDerivative)
        {
            if (!oChromosome.ISCNShortPossible)
            {
                // introduce aberration in chromosome object 
                // and get its ISCN long
                oChrTmp = (Chromosome)oChromosome.clone;
                oChrTmp.add(oBand);
                strTmp = oChrTmp.toString("E");
                if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                    strTmp = "+" + strTmp;
                oAberration = new Aberration(strTmp);
            }
            else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eDerivation)
            {
                strTmp = oChromosome.ISCNShort + "add(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                    strTmp = "+" + strTmp;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
            }
            else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eIsoDerivation)
            {
                // it will be no longer an ider but a der
                // i.e. ider(A)(q10)... -> der(A)...i(A)(q10)
                strTmp = oChromosome.CausingAberration.toString("EN");
                i = strTmp.IndexOf("q10");
                if (i == -1)
                {
                    i = strTmp.IndexOf("p10");
                    strTmp = "der(" + oChromosome.getChromosome1 + ")" + strTmp.Substring(i + 4) + "i(" + oChromosome.getChromosome1 + ")(p10)" + "add(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                }
                else
                    strTmp = "der(" + oChromosome.getChromosome1 + ")" + strTmp.Substring(i + 4) + "i(" + oChromosome.getChromosome1 + ")(q10)" + "add(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                    strTmp = "+" + strTmp;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
            }
            else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
            {
                strTmp = "+add(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                oAberration = new Aberration(strTmp);
            }
            else
            {
                // introduce addition into derivative chromosome
                oChrTmp = (Chromosome)oChromosome.clone;
                oChrTmp.add((Band)oBand.clone);

                if (oChrTmp.ISCNShortPossible)
                    strTmp = oChrTmp.ISCNShort;
                else
                    strTmp = oChrTmp.toString("E");

                if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                    strTmp = "+" + strTmp;

                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
            }

            // replace
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // multi-chromosome aberration

            // simply add to ISCNShort (ISCNShort is always possible in such cases)
            strTmp = oChromosome.ISCNShort + "add(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                // that is possible for specially handled whole arm translocations etc.
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doDeletionInterstitial(ref Chromosome oChromosome, ref Band StartBand, ref Band EndBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;

        if (oChromosome.CausingAberration == null)
        {
            // simply introduce aberration
            oAberration = new Aberration("del(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
        {
            // gain of "aberration"
            oAberration = new Aberration("+del(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // introduce the aberration into the chromosome, and get the new aberration from there
            oChrTmp = (Chromosome)oChromosome.clone;
            oChrTmp.delete((Band)StartBand.clone, (Band)EndBand.clone);

            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString("E");

            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doDeletionTerminal(ref Chromosome oChromosome, ref Band oBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;
        int i;

        if (oChromosome.CausingAberration == null)
        {
            oAberration = new Aberration("del(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.causesOneDerivative)
        {
            if (!oChromosome.ISCNShortPossible)
            {
                // introduce aberration in chromosome object 
                // and get its ISCN long
                oChrTmp = (Chromosome)oChromosome.clone;
                oChrTmp.delete(oBand);
                strTmp = oChrTmp.toString("E");
                if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                    strTmp = "+" + strTmp;
                oAberration = new Aberration(strTmp);
            }
            else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eDerivation)
            {
                strTmp = oChromosome.CausingAberration.toString("EN") + "del(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
            }
            else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eIsoDerivation)
            {
                // it will be no longer an ider but a der
                // i.e. ider(A)(q10)... -> der(A)...i(A)(q10)
                strTmp = oChromosome.CausingAberration.toString("EN");
                i = strTmp.IndexOf("q10");
                if (i == -1)
                {
                    i = strTmp.IndexOf("p10");
                    strTmp = "der(" + oChromosome.getChromosome1 + ")" + strTmp.Substring(i + 4) + "i(" + oChromosome.getChromosome1 + ")(p10)" + "del(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                }
                else
                    strTmp = "der(" + oChromosome.getChromosome1 + ")" + strTmp.Substring(i + 4) + "i(" + oChromosome.getChromosome1 + ")(q10)" + "del(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                if (oChromosome.CausingAberration.getNumericChange == QuantitativeAberration.QuantitativeAberrationType.Gain)
                    strTmp = "+" + strTmp;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
            }
            else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
            {
                strTmp = "+del(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                oAberration = new Aberration(strTmp);
            }
            else
            {
                // set up derivative chromosome
                strTmp = oChromosome.CausingAberration.toString("EN") + "del(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
                if (strTmp.StartsWith("+"))
                    strTmp = "+der(" + oChromosome.getChromosome1 + ")" + strTmp.Substring(1);
                else
                    strTmp = "der(" + oChromosome.getChromosome1 + ")" + strTmp;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
            }

            // replace
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // multi-chromosome aberration

            // simply add to ISCNShort (ISCNShort is always possible in such cases)
            strTmp = oChromosome.ISCNShort + "del(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")";
            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                // that is possible for specially handled whole arm translocations etc.
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doDicentric(ref Chromosome FirstChromosome, ref Band FirstBand, ref Chromosome SecondChromosome, ref Band SecondBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;

        if (FirstChromosome.CausingAberration == null)
        {
            if (SecondChromosome.CausingAberration == null)
            {
                // both are normal upto now
                oAberration = new Aberration("dic(" + FirstBand.getChromosome + ";" + SecondBand.getChromosome + ")(" + FirstBand.toString("EX") + ";" + SecondBand.toString("EX") + ")");
                moKaryotype.addAberration(oAberration);
            }
            else
            {
                // second chromosome is already derivative

                // introduce dic-aberration into second chromosome
                oChrTmp = (Chromosome)SecondChromosome.clone;
                oChrTmp.dicentric((Band)SecondBand.clone, FirstChromosome, (Band)FirstBand.clone);
                if (oChrTmp.ISCNShortPossible)
                    strTmp = oChrTmp.ISCNShort;
                else
                    strTmp = oChrTmp.toString;
                if (SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                {
                    strTmp = "+" + strTmp;
                    // this means that the first chromosome must be marked lost
                    oAberration = new Aberration("-" + FirstChromosome.getChromosome1);
                    moKaryotype.addAberration(oAberration);
                }
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();

                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration);
            }
        }
        else if (SecondChromosome.CausingAberration == null)
        {
            // first chromosome is already derivative
            // introduce dic-aberration into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.dicentric((Band)FirstBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                strTmp = "+" + strTmp;
                // this means that the second chromosome must be marked lost
                oAberration = new Aberration("-" + SecondChromosome.getChromosome1);
                moKaryotype.addAberration(oAberration);
            }
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
        }
        else
        {
            // both chromosomes are already derivatives
            // introduce dic-aberration into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.dicentric((Band)FirstBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds & SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            else if (FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                // the dic is gained, while the second chromosome is marked lost!
                strTmp = "+" + strTmp;
                // loss of the other chromosome
                if (SecondChromosome.getChromosome1 != "?")
                {
                    oAberration = new Aberration("-" + SecondChromosome.getChromosome1);
                    moKaryotype.addAberration(oAberration);
                }
                if (SecondChromosome.getChromosome2 != "")
                {
                    if (SecondChromosome.getChromosome2 != "?")
                    {
                        oAberration = new Aberration("-" + SecondChromosome.getChromosome2);
                        moKaryotype.addAberration(oAberration);
                    }
                    if (SecondChromosome.getChromosome3 != "")
                    {
                        if (SecondChromosome.getChromosome3 != "?")
                        {
                            oAberration = new Aberration("-" + SecondChromosome.getChromosome3);
                            moKaryotype.addAberration(oAberration);
                        }
                    }
                }
            }
            else if (SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                // the dic is gained, while the first chromosome is marked lost!
                strTmp = "+" + strTmp;
                // loss of the other chromosome
                if (FirstChromosome.getChromosome1 != "?")
                {
                    oAberration = new Aberration("-" + FirstChromosome.getChromosome1);
                    moKaryotype.addAberration(oAberration);
                }
                if (FirstChromosome.getChromosome2 != "")
                {
                    if (FirstChromosome.getChromosome2 != "?")
                    {
                        oAberration = new Aberration("-" + FirstChromosome.getChromosome2);
                        moKaryotype.addAberration(oAberration);
                    }
                    if (FirstChromosome.getChromosome3 != "")
                    {
                        if (FirstChromosome.getChromosome3 != "?")
                        {
                            oAberration = new Aberration("-" + FirstChromosome.getChromosome3);
                            moKaryotype.addAberration(oAberration);
                        }
                    }
                }
            }

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            if (FirstChromosome.CausingAberration.compareTo(SecondChromosome.CausingAberration) == 0)
                // special replacement 
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref SecondChromosome, ref oAberration, ref null/* TODO Change to default(_) if this is not a reference type */);
            else
            {
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref null/* TODO Change to default(_) if this is not a reference type */);
            }
        }
    }

    private void doDuplication(ref Chromosome oChromosome, ref Band StartBand, ref Band EndBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;

        if (oChromosome.CausingAberration == null)
        {
            // simply introduce aberration
            oAberration = new Aberration("dup(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
        {
            // gain of "aberration"
            oAberration = new Aberration("+dup(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // introduce the aberration into the chromosome, and get the new aberration from there
            oChrTmp = (Chromosome)oChromosome.clone;
            oChrTmp.duplicate((Band)StartBand.clone, (Band)EndBand.clone);

            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString("E");

            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doInsertionInterchromosomal(ref Chromosome AcceptorChromosome, ref Band AcceptorBand, ref Chromosome DonorChromosome, ref Band DonorStartBand, ref Band DonorEndBand)
    {
        Aberration oAberration;
        Aberration oAberration2;
        string strTmp;
        Chromosome oChrTmp;

        if (AcceptorChromosome.CausingAberration == null)
        {
            if (DonorChromosome.CausingAberration == null)
            {
                // both are normal upto now
                oAberration = new Aberration("ins(" + AcceptorBand.getChromosome + ";" + DonorStartBand.getChromosome + ")(" + AcceptorBand.toString("EX") + ";" + DonorStartBand.toString("EX") + DonorEndBand.toString("EX") + ")");
                moKaryotype.addAberration(oAberration);
            }
            else
            {
                // second chromosome is already derivative

                // introduce deletion(!) into donor chromosome
                oChrTmp = (Chromosome)DonorChromosome.clone;
                oChrTmp.delete((Band)DonorStartBand.clone, (Band)DonorEndBand.clone);
                if (oChrTmp.ISCNShortPossible)
                    strTmp = oChrTmp.ISCNShort;
                else
                    strTmp = oChrTmp.toString;
                if (DonorChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                    strTmp = "+" + strTmp;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();

                replaceAberration(ref DonorChromosome.CausingAberration, ref DonorChromosome, ref oAberration);

                // add der() for first chromosome
                // it is not such easy because a rearranged region could be translocated
                oChrTmp = new Chromosome(AcceptorBand.getChromosome); // faster than cloning
                oChrTmp.insert((Band)AcceptorBand.clone, DonorChromosome, (Band)DonorStartBand.clone, (Band)DonorEndBand.clone);
                if (oChrTmp.ISCNShortPossible)
                    strTmp = oChrTmp.ISCNShort;
                else
                    strTmp = oChrTmp.toString;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();

                moKaryotype.addAberration(oAberration);
            }
        }
        else if (DonorChromosome.CausingAberration == null)
        {
            // first chromosome is already derivative
            // introduce insertion into first chromosome
            oChrTmp = (Chromosome)AcceptorChromosome.clone;
            oChrTmp.insert((Band)AcceptorBand.clone, DonorChromosome, (Band)DonorStartBand.clone, (Band)DonorEndBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (AcceptorChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            replaceAberration(ref AcceptorChromosome.CausingAberration, ref AcceptorChromosome, ref oAberration);

            // add der() for second chromosome
            // from the point of view of the donor chromosome, it is a deletion!
            strTmp = "del(" + DonorStartBand.getChromosome + ")(" + DonorStartBand.toString("EX") + DonorEndBand.toString("EX") + ")";
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            moKaryotype.addAberration(oAberration);
        }
        else
        {
            // both chromosomes are already derivatives
            // introduce insertion into first chromosome
            oChrTmp = (Chromosome)AcceptorChromosome.clone;
            oChrTmp.insert((Band)AcceptorBand.clone, DonorChromosome, (Band)DonorStartBand.clone, (Band)DonorEndBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (AcceptorChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // from the point of view of the donor chromosome, it is a deletion!
            oChrTmp = (Chromosome)DonorChromosome.clone;
            oChrTmp.delete((Band)DonorStartBand.clone, (Band)DonorEndBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (DonorChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration2 = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            if (AcceptorChromosome.CausingAberration.compareTo(DonorChromosome.CausingAberration) == 0)
                // special replacement 
                replace2Aberrations(ref AcceptorChromosome.CausingAberration, ref AcceptorChromosome, ref DonorChromosome, ref oAberration, ref oAberration2);
            else
            {
                replaceAberration(ref AcceptorChromosome.CausingAberration, ref AcceptorChromosome, ref oAberration);
                replaceAberration(ref DonorChromosome.CausingAberration, ref DonorChromosome, ref oAberration2);
            }
        }
    }

    private void doInsertionIntraChromosomal(ref Chromosome oChromosome, ref Band AcceptorBand, ref Band DonorStartBand, ref Band DonorEndBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;

        if (oChromosome.CausingAberration == null)
        {
            // simply introduce aberration
            oAberration = new Aberration("ins(" + AcceptorBand.getChromosome + ")(" + AcceptorBand.toString("EX") + DonorStartBand.toString("EX") + DonorEndBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
        {
            // gain of "aberration"
            oAberration = new Aberration("+ins(" + AcceptorBand.getChromosome + ")(" + AcceptorBand.toString("EX") + DonorStartBand.toString("EX") + DonorEndBand.toString("EX") + ")");
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // introduce the aberration into the chromosome, and get the new aberration from there
            oChrTmp = (Chromosome)oChromosome.clone;
            oChrTmp.insert((Band)AcceptorBand.clone, (Band)DonorStartBand.clone, (Band)DonorEndBand.clone);

            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString("E");

            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doInversion(ref Chromosome oChromosome, ref Band StartBand, ref Band EndBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;

        if (oChromosome.CausingAberration == null)
        {
            // simply introduce aberration
            oAberration = new Aberration("inv(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
        {
            // gain of "aberration"
            oAberration = new Aberration("+inv(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // introduce the aberration into the chromosome, and get the new aberration from there
            oChrTmp = (Chromosome)oChromosome.clone;
            oChrTmp.invert((Band)StartBand.clone, (Band)EndBand.clone);

            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString("E");

            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doIsomerisation(ref Chromosome oChromosome, ref Band oBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;

        if (oChromosome.CausingAberration == null)
        {
            // simply introduce aberration
            if (oBand.isCentromer)
                oAberration = new Aberration("i(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")");
            else
                oAberration = new Aberration("idic(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
        {
            // gain of "aberration"
            if (oBand.isCentromer)
                oAberration = new Aberration("+i(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")");
            else
                oAberration = new Aberration("+idic(" + oBand.getChromosome + ")(" + oBand.toString("EX") + ")");
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // introduce the aberration into the chromosome, and get the new aberration from there
            oChrTmp = (Chromosome)oChromosome.clone;
            oChrTmp.isomerize((Band)oBand.clone);

            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString("E");

            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doTranslocationGeneral(ref Chromosome FirstChromosome, ref Band FirstBand, ref Chromosome SecondChromosome, ref Band SecondBand)
    {
        Aberration oAberration;
        Aberration oAberration2;
        string strTmp;
        Chromosome oChrTmp;

        if (FirstChromosome.CausingAberration == null)
        {
            if (SecondChromosome.CausingAberration == null)
            {
                // both are normal upto now
                oAberration = new Aberration("t(" + FirstBand.getChromosome + ";" + SecondBand.getChromosome + ")(" + FirstBand.toString("EX") + ";" + SecondBand.toString("EX") + ")");
                moKaryotype.addAberration(oAberration);
            }
            else
            {
                // second chromosome is already derivative

                // introduce translocation into second chromosome
                oChrTmp = (Chromosome)SecondChromosome.clone;
                oChrTmp.translocate((Band)SecondBand.clone, FirstChromosome, (Band)FirstBand.clone);
                if (oChrTmp.ISCNShortPossible)
                    strTmp = oChrTmp.ISCNShort;
                else
                    strTmp = oChrTmp.toString;
                if (SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                    strTmp = "+" + strTmp;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();

                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration);

                // add der() for first chromosome
                // oAberration = New Aberration("der(" & FirstBand.getChromosome & ")t(" & FirstBand.getChromosome & ";" & SecondBand.getChromosome & ")(" & FirstBand.toString("EX") & ";" & SecondBand.toString("EX") & ")")
                // it is not such easy because a rearranged region could be translocated
                oChrTmp = new Chromosome(FirstBand.getChromosome); // faster than cloning
                oChrTmp.translocate((Band)FirstBand.clone, SecondChromosome, (Band)SecondBand.clone);
                if (oChrTmp.ISCNShortPossible)
                    strTmp = oChrTmp.ISCNShort;
                else
                    strTmp = oChrTmp.toString;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();

                moKaryotype.addAberration(oAberration);
            }
        }
        else if (SecondChromosome.CausingAberration == null)
        {
            // first chromosome is already derivative
            // introduce translocation into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.translocate((Band)FirstBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);

            // add der() for second chromosome
            // oAberration = New Aberration("der(" & SecondBand.getChromosome & ")t(" & FirstBand.getChromosome & ";" & SecondBand.getChromosome & ")(" & FirstBand.toString("EX") & ";" & SecondBand.toString("EX") & ")")
            // it is not such easy because a rearranged region could be translocated
            oChrTmp = new Chromosome(SecondBand.getChromosome); // faster than cloning
            oChrTmp.translocate((Band)SecondBand.clone, FirstChromosome, (Band)FirstBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            moKaryotype.addAberration(oAberration);
        }
        else
        {
            // both chromosomes are already derivatives
            // introduce translocation into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.translocate((Band)FirstBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // introduce translocation into second chromosome
            oChrTmp = (Chromosome)SecondChromosome.clone;
            oChrTmp.translocate((Band)SecondBand.clone, FirstChromosome, (Band)FirstBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration2 = new Aberration(strTmp);
            oAberration2.correctDerivativeAberration();

            if (FirstChromosome.CausingAberration.compareTo(SecondChromosome.CausingAberration) == 0)
                // special replacement 
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref SecondChromosome, ref oAberration, ref oAberration2);
            else
            {
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
            }
        }
    }

    private void doTranslocationWholeArm(ref Chromosome FirstChromosome, ref Band FirstBand, ref Chromosome SecondChromosome, ref Band SecondBand)
    {
        Aberration oAberration;
        Aberration oAberration2;
        string strTmp;
        Chromosome oChrTmp;
        Band oBand1;
        Band oBand2;

        // we may need the other vritual half of the centromere later at several positions
        if (FirstBand.getArmWithoutUncetrainty == "p")
            oBand1 = new Band(FirstBand.getChromosomeWithoutUncertainty + "q10");
        else
            oBand1 = new Band(FirstBand.getChromosomeWithoutUncertainty + "p10");
        if (SecondBand.getArmWithoutUncetrainty == "p")
            oBand2 = new Band(SecondBand.getChromosomeWithoutUncertainty + "q10");
        else
            oBand2 = new Band(SecondBand.getChromosomeWithoutUncertainty + "p10");

        if (FirstChromosome.CausingAberration == null)
        {
            if (SecondChromosome.CausingAberration == null)
            {
                // both are normal upto now
                // check if it is a Robertsonian Translocation
                if ((FirstChromosome.getChromosome1 == "13" | FirstChromosome.getChromosome1 == "14" | FirstChromosome.getChromosome1 == "15" | FirstChromosome.getChromosome1 == "21" | FirstChromosome.getChromosome1 == "22") & (SecondChromosome.getChromosome1 == "13" | SecondChromosome.getChromosome1 == "14" | SecondChromosome.getChromosome1 == "15" | SecondChromosome.getChromosome1 == "21" | SecondChromosome.getChromosome1 == "22"))

                    oAberration = new Aberration("der(" + FirstBand.getChromosome + ";" + SecondBand.getChromosome + ")(q10;q10)");
                else
                    // not a Robertsionian
                    oAberration = new Aberration("t(" + FirstBand.getChromosome + ";" + SecondBand.getChromosome + ")(" + FirstBand.toString("EX") + ";" + SecondBand.toString("EX") + ")");
                moKaryotype.addAberration(oAberration);
            }
            else
            {
                // second chromosome is already derivative

                // introduce translocation into second chromosome
                oChrTmp = (Chromosome)SecondChromosome.clone;
                oChrTmp.translocate((Band)SecondBand.clone, FirstChromosome, (Band)FirstBand.clone);
                if (oChrTmp.ISCNShortPossible)
                    strTmp = "+" + oChrTmp.ISCNShort;
                else
                    strTmp = "+" + oChrTmp.toString;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration);

                // remove original chromosome from karyotype
                if (!SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                {
                    strTmp = "-" + SecondChromosome.getChromosome1;
                    oAberration = new Aberration(strTmp);
                    moKaryotype.addAberration(oAberration);
                }

                // add der() for first chromosome
                // oAberration = New Aberration("der(" & FirstBand.getChromosome & ")t(" & FirstBand.getChromosome & ";" & SecondBand.getChromosome & ")(" & FirstBand.toString("EX") & ";" & SecondBand.toString("EX") & ")")
                // it is not such easy because a rearranged region could be translocated
                oChrTmp = new Chromosome(FirstBand.getChromosome); // faster than cloning
                oChrTmp.translocate(oBand1, SecondChromosome, oBand2);
                if (oChrTmp.ISCNShortPossible)
                    strTmp = "+" + oChrTmp.ISCNShort;
                else
                    strTmp = "+" + oChrTmp.toString;
                oAberration = new Aberration(strTmp);
                oAberration.correctDerivativeAberration();
                moKaryotype.addAberration(oAberration);

                // remove original chromosome from karyotype
                if (!FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                {
                    strTmp = "-" + FirstChromosome.getChromosome1;
                    oAberration = new Aberration(strTmp);
                    moKaryotype.addAberration(oAberration);
                }
            }
        }
        else if (SecondChromosome.CausingAberration == null)
        {
            // first chromosome is already derivative
            // introduce translocation into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.translocate((Band)FirstBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = "+" + oChrTmp.ISCNShort;
            else
                strTmp = "+" + oChrTmp.toString;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();
            replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);

            // remove original chromosome from karyotype
            if (!FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                strTmp = "-" + FirstChromosome.getChromosome1;
                oAberration = new Aberration(strTmp);
                moKaryotype.addAberration(oAberration);
            }

            // add der() for second chromosome
            // oAberration = New Aberration("der(" & SecondBand.getChromosome & ")t(" & FirstBand.getChromosome & ";" & SecondBand.getChromosome & ")(" & FirstBand.toString("EX") & ";" & SecondBand.toString("EX") & ")")
            // it is not such easy because a rearranged region could be translocated
            oChrTmp = new Chromosome(SecondBand.getChromosome); // faster than cloning
            oChrTmp.translocate(oBand2, FirstChromosome, oBand1);
            if (oChrTmp.ISCNShortPossible)
                strTmp = "+" + oChrTmp.ISCNShort;
            else
                strTmp = "+" + oChrTmp.toString;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();
            moKaryotype.addAberration(oAberration);

            // remove original chromosome from karyotype
            if (!SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                strTmp = "-" + SecondChromosome.getChromosome1;
                oAberration = new Aberration(strTmp);
                moKaryotype.addAberration(oAberration);
            }
        }
        else
        {
            // both chromosomes are already derivatives
            // introduce translocation into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.translocate((Band)FirstBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = "+" + oChrTmp.ISCNShort;
            else
                strTmp = "+" + oChrTmp.toString;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // introduce translocation into second chromosome
            oChrTmp = (Chromosome)SecondChromosome.clone;
            oChrTmp.translocate(oBand2, FirstChromosome, oBand1);
            if (oChrTmp.ISCNShortPossible)
                strTmp = "+" + oChrTmp.ISCNShort;
            else
                strTmp = "+" + oChrTmp.toString;
            oAberration2 = new Aberration(strTmp);
            oAberration2.correctDerivativeAberration();

            if (FirstChromosome.CausingAberration.compareTo(SecondChromosome.CausingAberration) == 0)
                // special replacement 
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref SecondChromosome, ref oAberration, ref oAberration2);
            else
            {
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
            }

            // remove original chromosome(s) from karyotype
            if (!FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                strTmp = "-" + FirstChromosome.getChromosome1;
                oAberration = new Aberration(strTmp);
                moKaryotype.addAberration(oAberration);
            }
            if (!SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                strTmp = "-" + SecondChromosome.getChromosome1;
                oAberration = new Aberration(strTmp);
                moKaryotype.addAberration(oAberration);
            }
        }
    }

    private void doTranslocation3Chromosomes(ref Chromosome FirstChromosome, ref Band FirstBand, ref Chromosome SecondChromosome, ref Band SecondBand, ref Chromosome ThirdChromosome, ref Band ThirdBand)
    {
        Aberration oAberration;
        Aberration oAberration2;
        Aberration oAberration3;
        string strTmp;
        Chromosome oChrTmp;

        if (FirstChromosome.CausingAberration == null & SecondChromosome.CausingAberration == null & ThirdChromosome.CausingAberration == null)
        {
            oAberration = new Aberration("t(" + FirstBand.getChromosome + ";" + SecondBand.getChromosome + ";" + ThirdBand.getChromosome + ")(" + FirstBand.toString("EX") + ";" + SecondBand.toString("EX") + ";" + ThirdBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else
        {
            // at least one chromosomes is already derivatives
            // introduce translocation into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.translocate((Band)FirstBand.clone, ThirdChromosome, (Band)ThirdBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // introduce translocation into second chromosome
            oChrTmp = (Chromosome)SecondChromosome.clone;
            oChrTmp.translocate((Band)SecondBand.clone, FirstChromosome, (Band)FirstBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration2 = new Aberration(strTmp);
            oAberration2.correctDerivativeAberration();

            // introduce translocation into third chromosome
            oChrTmp = (Chromosome)ThirdChromosome.clone;
            oChrTmp.translocate((Band)ThirdBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (ThirdChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration3 = new Aberration(strTmp);
            oAberration3.correctDerivativeAberration();

            // specials if derivative chromosomes have same origin (same origin of all three chromosomes is still ignored)
            if (Aberration.Equals(FirstChromosome.CausingAberration, SecondChromosome.CausingAberration))
            {
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref SecondChromosome, ref oAberration, ref oAberration2);
                replaceAberration(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref oAberration3);
            }
            else if (Aberration.Equals(FirstChromosome.CausingAberration, ThirdChromosome.CausingAberration))
            {
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref ThirdChromosome, ref oAberration, ref oAberration3);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
            }
            else if (Aberration.Equals(SecondChromosome.CausingAberration, ThirdChromosome.CausingAberration))
            {
                replace2Aberrations(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref SecondChromosome, ref oAberration3, ref oAberration2);
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
            }
            else
            {
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
                replaceAberration(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref oAberration3);
            }
        }
    }

    private void doTranslocation4Chromosomes(ref Chromosome FirstChromosome, ref Band FirstBand, ref Chromosome SecondChromosome, ref Band SecondBand, ref Chromosome ThirdChromosome, ref Band ThirdBand, ref Chromosome FourthChromosome, ref Band FourthBand)
    {
        Aberration oAberration;
        Aberration oAberration2;
        Aberration oAberration3;
        Aberration oAberration4;
        string strTmp;
        Chromosome oChrTmp;

        if (FirstChromosome.CausingAberration == null & SecondChromosome.CausingAberration == null & ThirdChromosome.CausingAberration == null & FourthChromosome.CausingAberration == null)
        {
            oAberration = new Aberration("t(" + FirstBand.getChromosome + ";" + SecondBand.getChromosome + ";" + ThirdBand.getChromosome + ";" + FourthBand.getChromosome + ")(" + FirstBand.toString("EX") + ";" + SecondBand.toString("EX") + ";" + ThirdBand.toString("EX") + ";" + FourthBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else
        {
            // at least one chromosomes is already derivatives
            // introduce translocation into first chromosome
            oChrTmp = (Chromosome)FirstChromosome.clone;
            oChrTmp.translocate((Band)FirstBand.clone, FourthChromosome, (Band)FourthBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (FirstChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // introduce translocation into second chromosome
            oChrTmp = (Chromosome)SecondChromosome.clone;
            oChrTmp.translocate((Band)SecondBand.clone, FirstChromosome, (Band)FirstBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (SecondChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration2 = new Aberration(strTmp);
            oAberration2.correctDerivativeAberration();

            // introduce translocation into third chromosome
            oChrTmp = (Chromosome)ThirdChromosome.clone;
            oChrTmp.translocate((Band)ThirdBand.clone, SecondChromosome, (Band)SecondBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (ThirdChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration3 = new Aberration(strTmp);
            oAberration3.correctDerivativeAberration();

            // introduce translocation into fourth chromosome
            oChrTmp = (Chromosome)FourthChromosome.clone;
            oChrTmp.translocate((Band)FourthBand.clone, ThirdChromosome, (Band)ThirdBand.clone);
            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString;
            if (ThirdChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;
            oAberration4 = new Aberration(strTmp);
            oAberration4.correctDerivativeAberration();

            // specials if derivative chromosomes have same origin (same origin of all three chromosomes is still ignored)
            if (Aberration.Equals(FirstChromosome.CausingAberration, SecondChromosome.CausingAberration) & !FirstChromosome.CausingAberration == null)
            {
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref SecondChromosome, ref oAberration, ref oAberration2);
                replaceAberration(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref oAberration3);
                replaceAberration(ref FourthChromosome.CausingAberration, ref FourthChromosome, ref oAberration4);
            }
            else if (Aberration.Equals(FirstChromosome.CausingAberration, ThirdChromosome.CausingAberration)
                            & !FirstChromosome.CausingAberration == null)
            {
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref ThirdChromosome, ref oAberration, ref oAberration3);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
                replaceAberration(ref FourthChromosome.CausingAberration, ref FourthChromosome, ref oAberration4);
            }
            else if (Aberration.Equals(FirstChromosome.CausingAberration, FourthChromosome.CausingAberration)
                            & !FirstChromosome.CausingAberration == null)
            {
                replace2Aberrations(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref FourthChromosome, ref oAberration, ref oAberration4);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
                replaceAberration(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref oAberration3);
            }
            else if (Aberration.Equals(SecondChromosome.CausingAberration, ThirdChromosome.CausingAberration)
                            & !SecondChromosome.CausingAberration == null)
            {
                replace2Aberrations(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref ThirdChromosome, ref oAberration2, ref oAberration3);
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref FourthChromosome.CausingAberration, ref FourthChromosome, ref oAberration4);
            }
            else if (Aberration.Equals(SecondChromosome.CausingAberration, FourthChromosome.CausingAberration)
                            & !SecondChromosome.CausingAberration == null)
            {
                replace2Aberrations(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref FourthChromosome, ref oAberration2, ref oAberration4);
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref oAberration3);
            }
            else if (Aberration.Equals(ThirdChromosome.CausingAberration, ThirdChromosome.CausingAberration)
                            & !ThirdChromosome.CausingAberration == null)
            {
                replace2Aberrations(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref FourthChromosome, ref oAberration3, ref oAberration4);
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
            }
            else
            {
                replaceAberration(ref FirstChromosome.CausingAberration, ref FirstChromosome, ref oAberration);
                replaceAberration(ref SecondChromosome.CausingAberration, ref SecondChromosome, ref oAberration2);
                replaceAberration(ref ThirdChromosome.CausingAberration, ref ThirdChromosome, ref oAberration3);
                replaceAberration(ref FourthChromosome.CausingAberration, ref FourthChromosome, ref oAberration4);
            }
        }
    }

    private void doTricentric(ref Chromosome FirstChromosome, ref Band FirstBand, ref Chromosome MiddleChromosome, ref Band SecondBand, ref Band ThirdBand, ref Chromosome LastChromosome, ref Band LastBand)
    {
        Aberration oAberration;

        if (!FirstChromosome.CausingAberration == null | !MiddleChromosome.CausingAberration == null | !LastChromosome.CausingAberration == null)
            throw new Exception("Too complicated aberration: Cannot set up a tricentric chromosome with non-aberrant chromosomes.");

        // simply introduce aberration
        oAberration = new Aberration("trc(" + FirstBand.getChromosome + ";" + SecondBand.getChromosome + ";" + LastBand.getChromosome + ")(" + FirstBand.toString("EX") + ";" + SecondBand.toString("EX") + ThirdBand.toString("EX") + ";" + LastBand.toString("EX") + ")");
        moKaryotype.addAberration(oAberration);
    }

    private void doTriplication(ref Chromosome oChromosome, ref Band StartBand, ref Band EndBand)
    {
        Aberration oAberration;
        string strTmp;
        Chromosome oChrTmp;

        if (oChromosome.CausingAberration == null)
        {
            // simply introduce aberration
            oAberration = new Aberration("trp(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.CausingAberration.getAberrationType == QualitativeAberration.eAberrationType.eWholeChromosomeChange)
        {
            // gain of "aberration"
            oAberration = new Aberration("+trp(" + StartBand.getChromosome + ")(" + StartBand.toString("EX") + EndBand.toString("EX") + ")");
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
        else
        {
            // introduce the aberration into the chromosome, and get the new aberration from there
            oChrTmp = (Chromosome)oChromosome.clone;
            oChrTmp.triplicate((Band)StartBand.clone, (Band)EndBand.clone);

            if (oChrTmp.ISCNShortPossible)
                strTmp = oChrTmp.ISCNShort;
            else
                strTmp = oChrTmp.toString("E");

            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                strTmp = "+" + strTmp;

            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();

            // call replacement function
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);
        }
    }

    private void doWholeChromosomeGain(ref Chromosome oChromosome)
    {
        Aberration oAberration;
        string strTmp;

        if (oChromosome.CausingAberration == null)
        {
            oAberration = new Aberration("+" + oChromosome.getChromosome1);
            moKaryotype.addAberration(oAberration);
        }
        else
        {
            // no distinction on the number of derivative chromosomes caused by the aberration
            // required: we always add the selected chromosome
            if (oChromosome.ISCNShortPossible)
                strTmp = oChromosome.ISCNShort;
            else
                strTmp = oChromosome.toString("E");
            if (!strTmp.StartsWith("+"))
                strTmp = "+" + strTmp;
            oAberration = new Aberration(strTmp);
            oAberration.correctDerivativeAberration();
            moKaryotype.addAberration(oAberration);
        }
    }

    private void doWholeChromosomeLoss(ref Chromosome oChromosome)
    {
        Aberration oAberration;

        if (oChromosome.CausingAberration == null)
        {
            oAberration = new Aberration("-" + oChromosome.getChromosome1);
            moKaryotype.addAberration(oAberration);
        }
        else if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            // the chromosome to be removed is marked an additional chromosome
            // hence remove it only
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref null/* TODO Change to default(_) if this is not a reference type */);
        else
        {
            // loose each chromosome which is part of the der
            if (oChromosome.getChromosome1 == "?")
                oAberration = null/* TODO Change to default(_) if this is not a reference type */;
            else
                oAberration = new Aberration("-" + oChromosome.getChromosome1);
            replaceAberration(ref oChromosome.CausingAberration, ref oChromosome, ref oAberration);

            // add losses of other chromosomes
            if (oChromosome.getChromosome2 != "")
            {
                if (oChromosome.getChromosome2 != "?")
                {
                    oAberration = new Aberration("-" + oChromosome.getChromosome2);
                    moKaryotype.addAberration(oAberration);
                }
                if (oChromosome.getChromosome3 != "")
                {
                    if (oChromosome.getChromosome3 != "?")
                    {
                        oAberration = new Aberration("-" + oChromosome.getChromosome3);
                        moKaryotype.addAberration(oAberration);
                    }
                }
            }
        }
    }


    private void calculateAlteredChromosomes()
    {
        Chromosome oChromosome;

        mcChromosomes = new Chromosomes();

        // simply stick an identifier onto all chromosomes and add them
        foreach (var oChromosome in moKaryotype.getAlteredChromosomes)
        {
            oChromosome.ExternalID = oChromosome.getChromosome1 + "_" + (System.Convert.ToInt32(1 + mcChromosomes.getCountForChromosome(oChromosome.getChromosome1)).ToString);
            mcChromosomes.add(oChromosome);
        }
    }

    private void calculateChromosomes()
    {
        Chromosome oChromosome;
        Chromosome oChromosome2;
        int nPloidy;
        int i;
        int j;
        string strID = "";
        bool bFound;

        mcChromosomes = new Chromosomes();

        // rebuild ISCN formula
        // exactness is required because some derivative chromosomes may have been changed
        moKaryotype.toString("E");

        // create "normal" set for ploidy
        nPloidy = moKaryotype.getPloidyLevel;
        for (i = 1; i <= ChromosomeData.getInstance().getMaximumChromosomeNumber; i++)
        {
            for (j = 1; j <= nPloidy; j++)
            {
                oChromosome = new Chromosome(i.ToString());
                oChromosome.ExternalID = i.ToString() + "_" + j.ToString();
                mcChromosomes.add(oChromosome);
            }
        }
        // sex chromosomes
        if (moKaryotype.getPatientSex == "F")
        {
            // easy
            for (j = 1; j <= nPloidy; j++)
            {
                oChromosome = new Chromosome("X");
                oChromosome.ExternalID = "X_" + j.ToString();
                mcChromosomes.add(oChromosome);
            }
        }
        else
            // male
            if (nPloidy == 1)
        {
            oChromosome = new Chromosome("Y");
            oChromosome.ExternalID = "Y_1";
            mcChromosomes.add(oChromosome);
        }
        else
        {
            // i = CInt(Math.Floor((nPloidy + 1) / 2))
            for (j = 1; j <= System.Convert.ToInt32(Math.Floor((nPloidy + 1) / (double)2)); j++)
            {
                oChromosome = new Chromosome("X");
                oChromosome.ExternalID = "X_" + j.ToString();
                mcChromosomes.add(oChromosome);
            }

            for (j = 1; j <= System.Convert.ToInt32(Math.Floor(nPloidy / (double)2)); j++)
            {
                oChromosome = new Chromosome("Y");
                oChromosome.ExternalID = "Y_" + j.ToString();
                mcChromosomes.add(oChromosome);
            }
        }

        // now replace / add chromosomes
        foreach (var oChromosome in moKaryotype.getAlteredChromosomes)
        {
            bFound = false;
            if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
            {
                oChromosome.ExternalID = oChromosome.getChromosome1 + "_" + (System.Convert.ToInt32(1 + mcChromosomes.getCountForChromosome(oChromosome.getChromosome1)).ToString);
                mcChromosomes.add(oChromosome);
            }
            else if (oChromosome.Replaces == Chromosome.ReplacingStatus.Removes)
            {
                // find chromsome
                for (i = mcChromosomes.getCountForChromosome(oChromosome.getChromosome1); i >= 1; i += -1)
                {
                    strID = oChromosome.getChromosome1 + "_" + i.ToString();
                    oChromosome2 = mcChromosomes(oChromosome.getChromosome1, i);
                    if (oChromosome2.CausingAberration == null)
                    {
                        bFound = true;
                        break;
                    }
                }
                if (!bFound)
                    throw new Exception("No Chromosome #" + oChromosome.getChromosome1 + " left for removing by an aberration.");

                // OK, the chromosome for the first centromere exists.
                mcChromosomes.removeAt(oChromosome.getChromosome1, i);
            }
            else if (oChromosome.Replaces == Chromosome.ReplacingStatus.Replaces)
            {
                // a "normal" chromosome(s) must be replaced by the derivative chr.
                // problems do arise when a centromere is of unknown origin, 
                // since no chromosome of unknown origin can be replaced

                if (oChromosome.getChromosome1 == "?")
                {
                    // actually it is added!
                    oChromosome.Replaces = Chromosome.ReplacingStatus.Adds;
                    i = mcChromosomes.getCountForChromosome("?") + 1;
                    strID = "?_" + i.ToString();
                    oChromosome.ExternalID = strID;
                    mcChromosomes.add(oChromosome);
                }
                else
                {
                    for (i = mcChromosomes.getCountForChromosome(oChromosome.getChromosome1); i >= 1; i += -1)
                    {
                        strID = oChromosome.getChromosome1 + "_" + i.ToString();
                        oChromosome2 = mcChromosomes(oChromosome.getChromosome1, i);
                        if (oChromosome2.CausingAberration == null)
                        {
                            bFound = true;
                            break;
                        }
                    }
                    if (!bFound)
                        throw new Exception("No Chromosome #" + oChromosome.getChromosome1 + " left for replacement by a derivative chromosome.");

                    // OK, the chromosome for the first centromere exists.
                    mcChromosomes.removeAt(oChromosome.getChromosome1, i, false);
                    oChromosome.ExternalID = strID;
                    mcChromosomes.add(oChromosome);
                }

                // di- / tricentric chromosomes: other chromosomes are simply removed
                // again, do not try to remove chromosomes of unknown origin
                if (oChromosome.getChromosome2 != "")
                {
                    bFound = false;
                    if (oChromosome.getChromosome2 != "?")
                    {
                        for (i = mcChromosomes.getCountForChromosome(oChromosome.getChromosome2); i >= 1; i += -1)
                        {
                            strID = oChromosome.getChromosome2 + "_" + i.ToString();
                            oChromosome2 = mcChromosomes(oChromosome.getChromosome2, i);
                            if (oChromosome2.CausingAberration == null)
                            {
                                bFound = true;
                                break;
                            }
                        }
                        if (!bFound)
                            throw new Exception("No Chromosome #" + oChromosome.getChromosome2 + " left for replacement by a derivative chromosome.");

                        // OK, the chromosome for the second centromere exists.
                        mcChromosomes.removeAt(oChromosome.getChromosome2, i);
                    }

                    // tricentric
                    if (oChromosome.getChromosome3 != "")
                    {
                        if (oChromosome.getChromosome3 != "?")
                        {
                            bFound = false;
                            for (i = mcChromosomes.getCountForChromosome(oChromosome.getChromosome3); i >= 1; i += -1)
                            {
                                strID = oChromosome.getChromosome3 + "_" + i.ToString();
                                oChromosome2 = mcChromosomes(oChromosome.getChromosome3, i);
                                if (oChromosome2.CausingAberration == null)
                                {
                                    bFound = true;
                                    break;
                                }
                            }
                            if (!bFound)
                                throw new Exception("No Chromosome #" + oChromosome.getChromosome3 + " left for replacement by a derivative chromosome.");

                            // OK, the chromosome for the third centromere exists.
                            mcChromosomes.removeAt(oChromosome.getChromosome3, i);
                        }
                    }
                }
            }
        }
    }

    public ImageMapData getKaryogramAsMap(ChromosomeData.eResolutionLevel Resolution, float Scale, string DrawSequence, bool Colored, ref System.Drawing.Color BackGroundColor, bool AlteredChromosomesOnly)
    {
        ImageMapData oData;

        if (AlteredChromosomesOnly)
            calculateAlteredChromosomes();
        else
            calculateChromosomes();

        oData = CyDASGraphics.getInstance().drawKaryogram(mcChromosomes, Resolution, Scale, DrawSequence, Colored, BackGroundColor);

        return oData;
    }

    public void optimizeISCN()
    {
        SexChromosomes oSexChromosomes = new SexChromosomes();
        ChromosomeCount oChromosomeCount = new ChromosomeCount();
        // real chromosome count
        oChromosomeCount.MinimumCount = mcChromosomes.count; // + moKaryotype.getMarkers.CountMax + moKaryotype.getRings.CountMax
        oChromosomeCount.MaximumCount = oChromosomeCount.MinimumCount;
        oChromosomeCount.Ploidy = moKaryotype.getPloidyLevel;
        moKaryotype.setChromosomeCount(oChromosomeCount);

        // unchanged sex chromosomes
        int i;
        int j;
        int k;
        i = mcChromosomes.getCountForChromosome("X");
        k = 0;
        for (j = 1; j <= i; j++)
        {
            if (mcChromosomes("X", j).CausingAberration == null)
                k += 1;
        }
        oSexChromosomes.NumberOfX = k;

        i = mcChromosomes.getCountForChromosome("Y");
        k = 0;
        for (j = 1; j <= i; j++)
        {
            if (mcChromosomes("Y", j).CausingAberration == null)
                k += 1;
        }
        oSexChromosomes.NumberOfY = k;
        moKaryotype.setSexChromosomes(oSexChromosomes);

        // optimize der() aberrations
        Aberration oAberr;
        for (i = 1; i <= moKaryotype.getAberrations.count; i++)
        {
            oAberr = (Aberration)moKaryotype.getAberrations.item(i - 1); // aberrations is 0-based
            if (oAberr.getAberrationType == QualitativeAberration.eAberrationType.eDerivation | oAberr.getAberrationType == QualitativeAberration.eAberrationType.eIsoDerivation)
                oAberr.correctDerivativeAberration();
        }
    }

    private void replaceAberration(ref Aberration PreviousAberration, ref Chromosome PreviousChromosome, ref Aberration NewAberration)
    {
        Chromosome oChromosome;
        Aberration oAberration;
        int nMultiplicator;
        string strTmp;
        int i;

        // remove PreviousAberration
        if (!PreviousAberration == null)
        {
            nMultiplicator = PreviousAberration.getMultiplicatorMax;
            i = moKaryotype.getAberrations.indexOf(PreviousAberration);
            if (i == -1)
                throw new Exception("Internal error when processing data: Original aberration " + PreviousAberration.toString("E") + " not found among aberrations of karyotype.");
            if (nMultiplicator > 1)
                // reduce mulitplicators by 1
                moKaryotype.getAberrations.item(i).setMultiplicators(nMultiplicator - 1, nMultiplicator - 1);
            else
                // remove it; a replacement will be added later
                moKaryotype.getAberrations.removeAt(i);

            // add replacing aberrations
            foreach (var oChromosome in PreviousAberration.getAlteredChromosomes(true)) // ignore multiplicators!
            {
                if (!oChromosome.equals(PreviousChromosome))
                {
                    // appropriate der()
                    if (oChromosome.ISCNShortPossible)
                    {
                        strTmp = oChromosome.ISCNShort;
                        // it could be a whole unchanged chromosome
                        if (strTmp.Length <= 7)
                            strTmp = oChromosome.getChromosome1;
                    }
                    else
                        strTmp = oChromosome.toString("E");

                    if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                        strTmp = "+" + strTmp;
                    else if (oChromosome.Replaces == Chromosome.ReplacingStatus.Removes)
                        // that is possible for special handling of whole arm translocations etc.
                        strTmp = "-" + strTmp;

                    oAberration = new Aberration(strTmp);
                    oAberration.correctDerivativeAberration();

                    moKaryotype.addAberration(oAberration);
                }
            }
        }

        // add new current aberration
        if (!NewAberration == null)
            moKaryotype.addAberration(NewAberration);
    }

    private void replace2Aberrations(ref Aberration PreviousAberration, ref Chromosome PreviousChromosome1, ref Chromosome PreviousChromosome2, ref Aberration NewAberration1, ref Aberration NewAberration2)
    {
        Chromosome oChromosome;
        Aberration oAberration;
        int nMultiplicator;
        string strTmp;
        int i;

        // remove PreviousAberration
        if (!PreviousAberration == null)
        {
            nMultiplicator = PreviousAberration.getMultiplicatorMax;
            i = moKaryotype.getAberrations.indexOf(PreviousAberration);
            if (i == -1)
                throw new Exception("Internal error when processing data: Original aberration " + PreviousAberration.toString("E") + " not found among aberrations of karyotype.");
            if (nMultiplicator > 1)
                // reduce mulitplicators by 1
                moKaryotype.getAberrations.item(i).setMultiplicators(nMultiplicator - 1, nMultiplicator - 1);
            else
                // remove it; a replacement will be added later
                moKaryotype.getAberrations.removeAt(i);

            // add replacing aberrations
            foreach (var oChromosome in PreviousAberration.getAlteredChromosomes(true)) // ignore multiplicators!
            {
                if (!oChromosome.equals(PreviousChromosome1))
                {
                    if (!oChromosome.equals(PreviousChromosome2))
                    {
                        // appropriate der()
                        if (oChromosome.ISCNShortPossible)
                        {
                            strTmp = oChromosome.ISCNShort;
                            // it could be a whole unchanged chromosome
                            if (strTmp.Length <= 7)
                                strTmp = oChromosome.getChromosome1;
                        }
                        else
                            strTmp = oChromosome.toString("E");

                        if (oChromosome.Replaces == Chromosome.ReplacingStatus.Adds)
                            strTmp = "+" + strTmp;
                        else if (oChromosome.Replaces == Chromosome.ReplacingStatus.Removes)
                            // that is possible for special handling of whole arm translocations etc.
                            strTmp = "-" + strTmp;

                        oAberration = new Aberration(strTmp);
                        oAberration.correctDerivativeAberration();

                        moKaryotype.addAberration(oAberration);
                    }
                }
            }
        }

        // add new aberrations
        if (!NewAberration1 == null)
            moKaryotype.addAberration(NewAberration1);
        if (!NewAberration2 == null)
            moKaryotype.addAberration(NewAberration2);
    }

    public Karyotype Karyotype
    {
        get
        {
            return moKaryotype;
        }
        set
        {
            moKaryotype = Value;
        }
    }

    ~Karyogram()
    {
        base.Finalize();
    }
}
